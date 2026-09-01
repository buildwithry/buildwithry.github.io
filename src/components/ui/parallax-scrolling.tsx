'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowUpRight } from 'lucide-react';
import SplitType from 'split-type';
import { PRELOADER_DONE_EVENT } from '@/components/Preloader';
import adrianPhoto from '@/assets/HERO-red-optimized.jpg';

interface TrailThumb {
  src: string;
  alt: string;
}

// Every case study and funnel thumbnail is available to the hero trail. A fresh shuffled
// selection is used each time the visitor enters the hero, so the floating cards feel alive
// without introducing imagery that is unrelated to this portfolio.
const heroThumbs: TrailThumb[] = [
  {
    src: '/lovable-uploads/vapi-ai-receptionist.jpg',
    alt: 'VAPI AI Voice Receptionist case study',
  },
  {
    src: '/lovable-uploads/ai-meta-receptionist-v3.png',
    alt: 'AI Meta Receptionist case study',
  },
  {
    src: '/lovable-uploads/ghl-conversation-ai-ava.jpg',
    alt: 'GHL Conversation AI case study',
  },
  {
    src: '/lovable-uploads/asmr-ai-video-creator-thumbnail.png',
    alt: 'ASMR AI Video Creator case study',
  },
  {
    src: '/lovable-uploads/0382c638-b3db-4b63-806e-a772fbaeb008.png',
    alt: 'GHL re-engagement case study',
  },
  {
    src: '/lovable-uploads/2f07a1c7-8827-4169-9c4d-6353aa824503.png',
    alt: 'AI content repurposing case study',
  },
  {
    src: '/lovable-uploads/833c006f-8a7a-4522-8686-83e73cd9afa2.png',
    alt: 'Client onboarding case study',
  },
  {
    src: '/lovable-uploads/7d1106cf-f77a-469f-9c81-5dbbcf6626a8.png',
    alt: 'Expense reporting case study',
  },
  {
    src: '/funnels/thumbs/sample-real-estate-B-tech-luxury-scroll.jpeg',
    alt: 'Luxury Real Estate funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-moving-company-D-coastal-team.jpeg',
    alt: 'Coastal Movers funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-lawfirm-D-lora-gold-small-town-solo.jpeg',
    alt: 'Solo Law Firm funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-barbershop-E-brand-store.jpeg',
    alt: 'Barbershop Brand funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-auto-repair-B-european-import.jpeg',
    alt: 'European Auto Import funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-auto-repair-E-performance-tuning.jpeg',
    alt: 'Performance Tuning funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-marketing-agency-C-brand-studio.jpeg',
    alt: 'Brand Studio funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-physical-therapy-E-cash-pay.jpeg',
    alt: 'Cash-Pay Physical Therapy funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-solar-helios.jpeg',
    alt: 'Commercial Solar funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-vacation-rental-management.jpeg',
    alt: 'Vacation Rental Management funnel sample',
  },
  {
    src: '/funnels/thumbs/sample-utility-contractor.jpeg',
    alt: 'Utility Contractor funnel sample',
  },
];

const TRAIL_CARD_COUNT = 12;

const pickTrailThumbs = () => {
  const shuffled = [...heroThumbs].sort(() => Math.random() - 0.5);
  return Array.from(
    { length: TRAIL_CARD_COUNT },
    (_, index) => shuffled[index % shuffled.length],
  );
};

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [trailEnabled, setTrailEnabled] = useState(false);
  const [trailThumbs, setTrailThumbs] = useState<TrailThumb[]>([]);

  // Hero title letter reveal, ported from xenith-design.webflow.io's .title-hero.home:
  // GSAP SplitText splits the wordmark into ONE DIV PER LETTER (.gsap_split_letter,
  // display:inline-block, no overflow mask — confirmed by reading the live DOM), then
  // each letter tweens translate3d(0, Y%, 0) -> 0% and opacity 0 -> 1 on a stagger.
  // Xenith fires this as its preloader clears, so this listens for the drawer's
  // completion event instead of running on mount.
  useEffect(() => {
    const titleEl = parallaxRef.current?.querySelector<HTMLElement>('.parallax__title');
    if (!titleEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const split = new SplitType(titleEl, { types: 'chars', charClass: 'parallax__title-char' });
    const chars = split.chars ?? [];
    if (!chars.length) return;

    // Hidden until the reveal runs, so the letters never flash in fully-formed
    // behind the drawer and then animate.
    gsap.set(chars, { yPercent: 100, opacity: 0 });

    let tween: gsap.core.Tween | undefined;
    let revealed = false;
    const reveal = () => {
      if (revealed) return; // event and fallback must never both run
      revealed = true;
      tween = gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.025,
        ease: 'power3.out',
      });
    };

    window.addEventListener(PRELOADER_DONE_EVENT, reveal, { once: true });
    // Fallback: if the preloader was skipped or already finished before this
    // mounted, the letters must not stay stuck at opacity 0.
    const fallback = window.setTimeout(reveal, 6000);

    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, reveal);
      window.clearTimeout(fallback);
      tween?.kill();
      split.revert();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
    let timeline: gsap.core.Timeline | undefined;

    if (triggerElement) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: true,
        }
      });

      // Layers 1/2 = photo/title (existing). Layer 3 = subtitle, split out with its own
      // rate so title and subtitle move independently rather than as one locked block —
      // matching Xenith's hero (build-analysis.md effects #1/#2: title-hero and
      // sub-title-hero-wrapper each get their own ScrollTrigger).
      const layers = [
        { layer: "1", yPercent: 30 },
        { layer: "2", yPercent: 15 },
        { layer: "3", yPercent: 25 },
      ];

      layers.forEach((layerObj, idx) => {
        timeline?.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis({ duration: 0.65 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    return () => {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(triggerElement);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Cursor-image trail ported from Xenith's hero: after each 80px of pointer travel,
  // the next card is placed at the cursor, becomes the topmost card, and then shrinks
  // and fades while subsequent cards follow it.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!trailEnabled) return;

    const container = parallaxRef.current?.querySelector<HTMLElement>('.parallax__thumbs');
    const section = parallaxRef.current?.querySelector<HTMLElement>('.parallax__header');
    if (!container || !section) return;

    const thumbEls = Array.from(container.querySelectorAll<HTMLElement>('.parallax__thumb'));
    if (thumbEls.length === 0) return;

    const pointer = { x: 0, y: 0 };
    const lastPointer = { x: 0, y: 0 };
    const trailingPointer = { x: 0, y: 0 };
    const THRESHOLD = 80;
    let imageIndex = 0;
    let zIndex = 1;
    let previousThumbSrc = "";
    let hasPointer = false;
    let frameId: number | null = null;
    let isVisible = true;
    let pointerInside = false;

    gsap.set(thumbEls, { opacity: 0, scale: 0, x: 0, y: 0 });

    const readPointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;

      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      return true;
    };

    const showNextImage = () => {
      zIndex += 1;
      imageIndex = (imageIndex + 1) % thumbEls.length;
      const el = thumbEls[imageIndex];
      let nextThumb = heroThumbs[Math.floor(Math.random() * heroThumbs.length)];

      while (heroThumbs.length > 1 && nextThumb.src === previousThumbSrc) {
        nextThumb = heroThumbs[Math.floor(Math.random() * heroThumbs.length)];
      }
      previousThumbSrc = nextThumb.src;

      const image = el.querySelector<HTMLImageElement>("img");
      if (image) {
        image.src = nextThumb.src;
        image.alt = nextThumb.alt;
      }

      const width = el.offsetWidth;
      const height = el.offsetHeight;

      gsap.killTweensOf(el);
      gsap.timeline()
        .fromTo(
          el,
          {
            opacity: 0,
            scale: 0,
            zIndex,
            x: trailingPointer.x - width / 2,
            y: trailingPointer.y - height / 2,
          },
          {
            duration: 0.4,
            ease: 'power2.out',
            opacity: 1,
            scale: 1,
            x: pointer.x - width / 2,
            y: pointer.y - height / 2,
          },
          0
        )
        .to(
          el,
          {
            duration: 0.8,
            ease: 'power2.out',
            opacity: 0,
            scale: 0.2,
            x: trailingPointer.x - width / 2,
            y: trailingPointer.y - height / 2,
          },
          1
        );
    };

    const renderTrail = () => {
      frameId = null;
      if (!isVisible || !pointerInside) return;

      trailingPointer.x += (pointer.x - trailingPointer.x) * 0.1;
      trailingPointer.y += (pointer.y - trailingPointer.y) * 0.1;

      if (Math.hypot(pointer.x - lastPointer.x, pointer.y - lastPointer.y) > THRESHOLD) {
        showNextImage();
        lastPointer.x = pointer.x;
        lastPointer.y = pointer.y;
      }

      if (Math.hypot(pointer.x - trailingPointer.x, pointer.y - trailingPointer.y) > 1) {
        frameId = requestAnimationFrame(renderTrail);
      }
    };

    const startRender = () => {
      if (isVisible && frameId === null) frameId = requestAnimationFrame(renderTrail);
    };

    const handleMove = (e: MouseEvent) => {
      if (!readPointer(e.clientX, e.clientY)) return;
      pointerInside = true;

      if (!hasPointer) {
        hasPointer = true;
        lastPointer.x = pointer.x;
        lastPointer.y = pointer.y;
        trailingPointer.x = pointer.x;
        trailingPointer.y = pointer.y;
      }

      startRender();
    };

    const handleLeave = () => {
      pointerInside = false;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseleave', handleLeave);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && hasPointer && pointerInside) startRender();
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(section);

    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', handleLeave);
      visibilityObserver.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
      gsap.killTweensOf(thumbEls);
    };
  }, [trailEnabled, trailThumbs]);

  const enableTrail = () => {
    setTrailThumbs(pickTrailThumbs());
    setTrailEnabled(true);
  };

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header" onMouseEnter={enableTrail}>
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>

          <div data-parallax-layers className="parallax__layers">
            <img
              src={adrianPhoto}
              data-parallax-layer="1"
              alt="Adrian Agdan — Automation Specialist"
              className="parallax__layer-img parallax__layer-img--photo"
            />
            <div className="parallax__scrim" />

            <div className="parallax__thumbs" aria-hidden>
              {trailEnabled && trailThumbs.map((t, index) => (
                <div
                  key={`${t.src}-${index}`}
                  className="parallax__thumb"
                >
                  <img src={t.src} alt={t.alt} loading="lazy" />
                </div>
              ))}
            </div>

            <div data-parallax-layer="2" className="parallax__layer-title">
              <h1 className="parallax__title">BUILD WITH RY</h1>
              <div data-parallax-layer="3" className="parallax__hero-copy">
                <p className="parallax__subtitle">
                  AI voice agents, GoHighLevel pipelines, and coded funnels for service businesses
                  that need every lead answered, routed, and followed up automatically.
                </p>
                <div className="parallax__hero-actions">
                  <a href="#casestudies" className="btn-primary">
                    View case studies
                    <ArrowUpRight className="w-4 h-4" aria-hidden />
                  </a>
                  <a
                    href="https://calendly.com/buildwithry/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Book a 30-min call
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
    </div>
  );
}
