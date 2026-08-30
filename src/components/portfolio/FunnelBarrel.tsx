import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface FunnelSample {
  file: string;
  label: string;
  tag: string;
  desc: string;
}

interface FunnelBarrelProps {
  funnels: FunnelSample[];
  onOpen: (funnel: FunnelSample) => void;
}

interface CardData {
  funnel: FunnelSample;
  baseY: number;
  baseAngle: number;
  cur: number;
  dim: number;
}

const thumbUrl = (f: FunnelSample) => `/funnels/thumbs/${f.file.replace(".html", ".jpeg")}`;

/**
 * 3D drag-to-spin funnel carousel, ported from teardowns/2026-08-30-brewedops-funnels
 * (source/js/FunnelBarrel.beautified.js, downloaded from the live
 * portfolio.brewedops.cloud bundle chunk `FunnelBarrel-DGRO3DSO.js`).
 *
 * A cylindrical drum of textured, rounded-corner card meshes arranged in rings.
 * Auto-rotates slowly, drag/pointermove spins and tilts it, raycasting picks the
 * hovered card (shows a floating label) and click opens it. Constants (ring count,
 * card aspect, easing rates) are transcribed 1:1 from the original render loop.
 */
const FunnelBarrel = ({ funnels, onOpen }: FunnelBarrelProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  useEffect(() => {
    const mount = mountRef.current;
    const canvas = canvasRef.current;
    const labelEl = labelRef.current;
    if (!mount || !canvas || !labelEl || funnels.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      mount.dataset.failed = "true";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 4.2, 31);
    camera.lookAt(0, 0.5, 0);

    const perRing = 16;
    const rings = Math.max(6, Math.ceil(funnels.length / perRing));
    const cardHeight = 11;
    const angleStep = (Math.PI * 2) / perRing;
    const angleSpan = angleStep * 0.9;
    const cardWidth = angleSpan * cardHeight * (4 / 3);
    const ringGap = cardWidth * 1.04;
    const drumHeight = rings * ringGap;

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const textureCache = new Map<string, THREE.Texture>();
    const materials: THREE.MeshBasicMaterial[] = [];

    function loadTexture(url: string, slotIndex: number) {
      const cached = textureCache.get(url);
      if (cached) return cached;
      const tex = loader.load(url, undefined, undefined, () => {
        const mat = materials[slotIndex];
        if (mat) {
          if (mat.map) {
            mat.map.dispose();
            mat.map = null;
          }
          mat.userData.base = 0.22;
          mat.needsUpdate = true;
        }
      });
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.anisotropy = maxAniso;
      textureCache.set(url, tex);
      return tex;
    }

    // Rounded-rect alpha mask so each card reads as a phone-shaped card, not a hard rectangle.
    function makeRoundedAlphaMap() {
      const c = document.createElement("canvas");
      c.width = 300;
      c.height = 400;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 300, 400);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(30, 0);
      ctx.arcTo(300, 0, 300, 400, 30);
      ctx.arcTo(300, 400, 0, 400, 30);
      ctx.arcTo(0, 400, 0, 0, 30);
      ctx.arcTo(0, 0, 300, 0, 30);
      ctx.closePath();
      ctx.fill();
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    }

    const alphaMap = makeRoundedAlphaMap();
    const geometry = new THREE.CylinderGeometry(
      cardHeight,
      cardHeight,
      cardWidth,
      24,
      1,
      true,
      -angleSpan / 2,
      angleSpan
    );
    const drumInner = new THREE.Group();
    const drum = new THREE.Group();
    drum.add(drumInner);
    drum.rotation.z = -0.04;
    drum.rotation.x = 0.16;
    drum.position.set(0, -1, 0);
    scene.add(drum);

    const cards: THREE.Mesh[] = [];
    const totalSlots = rings * perRing;
    const count = funnels.length;
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    let step = Math.max(1, Math.round(count / 3));
    while (count > 1 && gcd(step, count) !== 1) step++;
    const order: number[] = [];
    for (let i = 0; i < totalSlots; i++) order.push(i < count ? i : (i * step) % count);

    let slot = 0;
    for (let ring = 0; ring < rings; ring++) {
      for (let n = 0; n < perRing; n++) {
        const funnel = funnels[order[slot]];
        const material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          transparent: true,
          alphaMap,
        });
        material.userData.base = 1;
        materials[slot] = material;
        material.map = loadTexture(thumbUrl(funnel), slot);

        const mesh = new THREE.Mesh(geometry, material);
        const angle = n * angleStep + (ring % 2 ? angleStep * 0.5 : 0);
        mesh.rotation.y = angle;
        mesh.position.y = ring * ringGap - drumHeight / 2 + ringGap / 2;
        mesh.userData = {
          funnel,
          baseY: mesh.position.y,
          baseAngle: angle,
          cur: 0,
          dim: 1,
        } satisfies CardData;
        drumInner.add(mesh);
        cards.push(mesh);
        slot++;
      }
    }

    const raycaster = new THREE.Raycaster();
    const getCardMaterial = (object: THREE.Object3D) => {
      const material = (object as THREE.Mesh).material;
      return material instanceof THREE.MeshBasicMaterial ? material : null;
    };
    const pointerNdc = new THREE.Vector2(-2, -2);
    let hovered: THREE.Mesh | null = null;
    let spinVelocity = 0;
    let spinCurrent = 0;
    let dragTiltX = 0;
    let dragSpinY = 0;
    let bobOffset = 0;
    let isHovering = false;

    const labelCat = labelEl.querySelector<HTMLElement>(".funnel-barrel-label-cat")!;
    const labelTitle = labelEl.querySelector<HTMLElement>(".funnel-barrel-label-title")!;

    function updatePointer(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      labelEl!.style.left = e.clientX - rect.left + "px";
      labelEl!.style.top = e.clientY - rect.top + "px";
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragMoved = 0;
    let lastX = 0;
    let lastY = 0;

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e);
      dragTiltX = pointerNdc.x * 0.22;
      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        dragSpinY += dx * 0.006;
        spinVelocity += dy * 0.01;
        dragMoved += Math.abs(dx) + Math.abs(dy);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onPointerEnter = () => {
      isHovering = true;
    };
    const onPointerLeave = () => {
      isHovering = false;
      pointerNdc.set(-2, -2);
      hovered = null;
      labelEl!.classList.remove("is-on");
    };
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = lastX = e.clientX;
      dragStartY = lastY = e.clientY;
      dragMoved = 0;
      updatePointer(e);
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onPointerUp = (e: PointerEvent) => {
      const wasClick =
        dragMoved < 6 && Math.abs(e.clientX - dragStartX) < 6 && Math.abs(e.clientY - dragStartY) < 6;
      isDragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
      if (wasClick) {
        updatePointer(e);
        raycaster.setFromCamera(pointerNdc, camera);
        const hit = raycaster
          .intersectObjects(cards, false)
          .find((hit) => (getCardMaterial(hit.object)?.opacity ?? 0) > 0.08)
          ?.object as THREE.Mesh | undefined;
        const data = hit?.userData as CardData | undefined;
        if (data?.funnel) onOpenRef.current(data.funnel);
      }
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);

    function resize() {
      const w = Math.max(1, mount!.clientWidth);
      const h = Math.max(1, mount!.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let isIntersecting = true;
    let rafRunning = false;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? true;
        if (isIntersecting) startLoop();
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(mount);

    const onVisibility = () => {
      if (!document.hidden && isIntersecting) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const timer = new THREE.Timer();
    timer.connect(document);
    let rafId = 0;

    function startLoop() {
      if (rafRunning) return;
      rafRunning = true;
      rafId = requestAnimationFrame(tick);
    }

    function tick(timestamp: number) {
      if (document.hidden || !isIntersecting) {
        rafRunning = false;
        return;
      }
      rafId = requestAnimationFrame(tick);
      timer.update(timestamp);
      const dt = Math.min(timer.getDelta(), 0.05);

      spinCurrent += (reducedMotion ? 0 : isHovering ? 0.04 : 0.16) * dt;
      drumInner.rotation.y = spinCurrent + dragSpinY + dragTiltX * 0.4;
      if (!reducedMotion && !isHovering) spinVelocity += 0.35 * dt;
      bobOffset += (spinVelocity - bobOffset) * Math.min(1, dt * 5);

      for (const card of cards) {
        const data = card.userData as CardData;
        let y = data.baseY + bobOffset;
        y = (((y + drumHeight / 2) % drumHeight) + drumHeight) % drumHeight - drumHeight / 2;
        if (card === hovered && Math.abs(y - card.position.y) > ringGap * 1.5) {
          hovered = null;
          labelEl!.classList.remove("is-on");
        }
        card.position.y = y;
      }

      if (isHovering && !isDragging) {
        raycaster.setFromCamera(pointerNdc, camera);
        const hit =
          (raycaster
            .intersectObjects(cards, false)
            .find((hit) => (getCardMaterial(hit.object)?.opacity ?? 0) > 0.08)
            ?.object as THREE.Mesh | undefined) ?? null;
        if (hit !== hovered) {
          hovered = hit;
          if (hovered) {
            const data = hovered.userData as CardData;
            labelCat.textContent = data.funnel.tag;
            labelTitle.textContent = data.funnel.label;
            labelEl!.classList.add("is-on");
            canvas.style.cursor = "pointer";
          } else {
            labelEl!.classList.remove("is-on");
            canvas.style.cursor = "grab";
          }
        }
      }

      const anyHovered = !!hovered;
      const nearRange = ringGap * 0.7;
      const farRange = ringGap * 0.85;
      for (const card of cards) {
        const data = card.userData as CardData;
        const isHovered = card === hovered;
        data.cur += ((isHovered ? 1 : 0) - data.cur) * Math.min(1, dt * 10);
        const targetDim = !anyHovered || isHovered ? 1 : 0.4;
        data.dim += (targetDim - data.dim) * Math.min(1, dt * 8);
        const scale = 1 + data.cur * 0.06;
        const worldY = drum.position.y + card.position.y;
        card.rotation.y = data.baseAngle + worldY * 0.05;
        const widthScale = 0.6 + 0.5 * Math.min(1, Math.max(0, (worldY + nearRange + farRange) / (2 * (nearRange + farRange))));
        card.scale.set(widthScale * scale, scale, widthScale * scale);
        const fade = Math.min(1, Math.max(0, (nearRange + farRange - Math.abs(worldY)) / farRange));
        const material = card.material as THREE.MeshBasicMaterial;
        material.opacity = fade;
        card.visible = fade > 0.01;
        material.color.setScalar((material.userData.base ?? 1) * data.dim);
      }

      renderer.render(scene, camera);
    }

    canvas.style.cursor = "grab";
    startLoop();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      geometry.dispose();
      alphaMap.dispose();
      materials.forEach((m) => m.dispose());
      textureCache.forEach((t) => t.dispose());
      timer.dispose();
      renderer.dispose();
    };
  }, [funnels]);

  return (
    <div className="funnel-barrel" ref={mountRef}>
      <canvas className="funnel-barrel-gl" ref={canvasRef} aria-hidden="true" />
      <div className="funnel-barrel-label" ref={labelRef} aria-hidden="true">
        <span className="funnel-barrel-label-cat" />
        <span className="funnel-barrel-label-title" />
      </div>
      <span className="funnel-barrel-hint" aria-hidden="true">
        Drag to spin · click a page to open
      </span>
    </div>
  );
};

export default FunnelBarrel;
