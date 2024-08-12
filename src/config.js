const config = {
  basename: '',
  defaultPath: '/dashboard/default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  outlinedFilled: true,
  theme: 'light', // light, dark
  presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
  i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false,
  jwt: {
    secret: 'SECRET-KEY',
    timeout: '1 days',
  },
};

export default config;
