module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/ban-ts-ignore': 0,
		'@typescript-eslint/member-delimiter-style': 0,
		'@typescript-eslint/no-explicit-any': 0,
	},
}
