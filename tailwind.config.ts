import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'ubuntu': ['Ubuntu', 'sans-serif'],
				'colfax': ['Inter', 'sans-serif'], // Using Inter as Colfax alternative
				'futuristic': ['Orbitron', 'sans-serif'], // For "Build with RY" logo
				'anonymous': ['Anonymous Pro', 'monospace'], // For typewriter effect
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'lightning-strike': {
					'0%, 90%, 100%': {
						textShadow: 'none',
						filter: 'brightness(1)'
					},
					'10%': {
						textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary))',
						filter: 'brightness(1.5)'
					},
					'20%': {
						textShadow: 'none',
						filter: 'brightness(1)'
					},
					'35%': {
						textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary)), 0 0 20px hsl(var(--primary))',
						filter: 'brightness(2)'
					},
					'40%': {
						textShadow: 'none',
						filter: 'brightness(1)'
					}
				},
				'zap-glow': {
					'0%, 90%, 100%': {
						filter: 'brightness(1)',
						color: 'hsl(var(--primary))'
					},
					'10%': {
						filter: 'brightness(1.5) drop-shadow(0 0 8px #fbbf24)',
						color: '#fbbf24'
					},
					'35%': {
						filter: 'brightness(2) drop-shadow(0 0 15px #f59e0b) drop-shadow(0 0 25px #fbbf24)',
						color: '#f59e0b'
					}
				},
				'crack-flash': {
					'0%, 90%, 100%': {
						opacity: '0',
						transform: 'scale(0)'
					},
					'10%': {
						opacity: '0.3',
						transform: 'scale(1)'
					},
					'35%': {
						opacity: '0.6',
						transform: 'scale(1.2)'
					},
					'40%': {
						opacity: '0',
						transform: 'scale(0)'
					}
				},
				'typewriter': {
					from: { width: '0' },
					to: { width: '100%' }
				},
				'typewriter-loop': {
					'0%': { width: '0' },
					'70%': { width: '100%' },
					'100%': { width: '100%' }
				},
				'blinkingCursor': {
					from: { borderRightColor: 'rgba(255,255,255,0.75)' },
					to: { borderRightColor: 'transparent' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'lightning-strike': 'lightning-strike 4s ease-in-out infinite',
				'zap-glow': 'zap-glow 4s ease-in-out infinite',
				'crack-flash': 'crack-flash 4s ease-in-out infinite',
				'typewriter': 'typewriter-loop 4s steps(50) infinite, blinkingCursor 500ms steps(50) infinite normal',
				'blinking-cursor': 'blinkingCursor 500ms steps(50) infinite normal'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
