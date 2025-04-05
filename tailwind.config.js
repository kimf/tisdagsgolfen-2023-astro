/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Main colors from the color palette image
        teal: '#008080',
        'dark-side': '#004444',
        whiteout: '#FBFBFB',
        'salmon-tint': '#EFCCBF',
        'ulthuan-grey': '#C7E0D9',
        'sugar-cookie': '#F2E2A4',

        // Additional dark colors for the retro game UI
        'charcoal-gray': '#121212',
        'dark-slate-gray': '#191919',
        'outer-space': '#252525',
        'rich-black': '#0A0A0A',
        'coffee-bean': '#1B1B1B',

        // UI colors for the scoring interface
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: {
        // Retro-inspired fonts
        retro: ['Courier New', 'monospace'],
        pixel: ['Press Start 2P', 'Courier New', 'monospace'],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        serif: ['Cambria', 'Georgia', 'serif']
      },
      boxShadow: {
        retro: '4px 4px 0px rgba(0, 0, 0, 0.2)',
        'retro-lg': '6px 6px 0px rgba(0, 0, 0, 0.2)',
        'inner-retro': 'inset 4px 4px 0px rgba(0, 0, 0, 0.2)'
      },
      borderWidth: {
        3: '3px'
      }
    }
  },
  plugins: []
};
