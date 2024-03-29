module.exports = {
  env: { node: true, jest: true },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
  },
}
