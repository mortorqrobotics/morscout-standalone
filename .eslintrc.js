module.exports = {
    extends: [
        "eslint-config-react-app",
        "plugin:prettier/recommended"
    ],
    rules: {
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-filename-extension": "off",
        "react/no-multi-comp": "off",
        "react/no-array-index-key": "off",
        "react/require-default-props": "off",
        "react/indent": "off",
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", {
            aspects: ["invalidHref"]
        }],
        "jsx-a11y/no-noninteractive-element-to-interactive-role": "off"
    }
}
