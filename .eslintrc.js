module.exports = {
  'root': true,
  // "parser": "babel-eslint",
  'extends': [
    'eslint:recommended',
    'react-app'
  ],
  'plugins': [
    'react-hooks',
    'html',
  ],
  'env': {
    'es6': true,
    'browser': true,
    'commonjs': true
  },
  "parserOptions":{
    "ecmaFeatures":{
      "jsx": true
    }
  },
  'rules': {
    'no-console': 'off',
    'no-debugger': process.env.npm_config_NODEENV === 'production' ? 'error' : 'off',
    'strict': [
      0
    ],
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1
      }
    ],
    'no-useless-escape': 0,
    'quotes': [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'semi': [
      2,
      'always'
    ],
    'no-multi-spaces': [
      2
    ],
    'no-self-compare': [
      2
    ],
    'max-depth': [
      2,
      4
    ],
    'max-nested-callbacks': [
      2,
      4
    ],
    'max-params': [
      2,
      4
    ],
    'max-statements': [
      2,
      25
    ],
    'max-statements-per-line': [
      2
    ],
    'max-len': [
      2,
      120
    ],
    'multiline-ternary': [
      0
    ],
    'callback-return': [
      2
    ],
    'handle-callback-err': [
      2
    ],
    'array-bracket-spacing': [
      2
    ],
    'no-const-assign': [
      2
    ],
    'no-return-assign': [
      0
    ],
    'no-inner-declarations': [
      2
    ],
    'no-var': [
      2
    ],
    'no-lonely-if': [
      2
    ],
    'require-jsdoc': [
      0,
      {
        'require': {
          'FunctionDeclaration': true,
          'MethodDefinition': true,
          'ClassDeclaration': true
        }
      }
    ],
    'valid-jsdoc': [
      2, {
        'requireReturn': false
      }
    ],
    'no-undef': [
      2
    ],
    'react/jsx-uses-react': [
      2
    ],
    'react/jsx-uses-vars': [
      2
    ],
    'react/jsx-no-undef': [
      2
    ],
    'react-hooks/rules-of-hooks': 'error',
  },
};