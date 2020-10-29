module.exports = {
  root: true,
  extends: 'react-app',
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.npm_config_NODEENV === 'production' ? 'error' : 'off',
  },
}
