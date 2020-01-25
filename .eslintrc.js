module.exports = {
    extends: 'standard',
    parser: 'typescript-eslint-parser',
    env: {
        commonjs: true,
        es6: true,
        node: true,
        mocha: true
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {}
    },
    plugins: ['typescript'],
    overrides: {
        files: ['**/*.ts'],
        parser: 'typescript-eslint-parser',
        rules: {
            'no-undef': 'off',
            'typescript/no-unused-vars': 'error',
            'typescript/class-name-casing': 'error',
            'typescript/interface-name-prefix': ['error', 'always'],
            'typescript/no-empty-interface': 'error',
            'typescript/no-array-constructor': 'error',
            'typescript/type-annotation-spacing': ['error', { before: false, after: true }]
        }
    },
    rules: {
        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'require-jsdoc': 'error',
        'camelcase': ['error', {'properties': 'always'}],
        'eol-last': ['error', 'always'],
        'curly': ['error', 'multi-or-nest'],
        'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
        'brace-style': ['error', 'stroustrup'],
        'comma-dangle': ['error', 'never'],
        'no-return-await': 'off',
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }]
    }
};