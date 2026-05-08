module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        surface: '#13121b',
        'surface-container': '#1f1f28',
        'surface-container-high': '#2a2933',
        'surface-container-highest': '#35343e',
        background: '#13121b',
        on_background: '#e4e1ee',
        primary: '#c4c0ff',
        'primary-container': '#8781ff',
        secondary: '#ffb3b0',
        'secondary-container': '#901822',
        tertiary: '#ffb785',
        'on-surface-variant': '#c7c4d8',
        outline: '#918fa1',
        'outline-variant': '#464555',
        'surface-variant': '#35343e',
        'surface-dim': '#13121b',
        'surface-bright': '#393842',
        'on-surface': '#e4e1ee'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
      },
      fontFamily: {
        'h1': ['Space Grotesk'],
        'h2': ['Space Grotesk'],
        'h3': ['Space Grotesk'],
        'body-lg': ['Lexend'],
        'body-md': ['Lexend'],
        'label-caps': ['Space Grotesk'],
        'stat-lg': ['Space Grotesk']
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '600' }],
        'stat-lg': ['40px', { lineHeight: '1.0', fontWeight: '700' }]
      },
      boxShadow: {
        glow: '0 0 28px rgba(196, 192, 255, 0.18)'
      }
    }
  },
  plugins: []
};
