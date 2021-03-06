module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "arrow-spacing": [2, { "before": true, "after": true }],
        "block-spacing": [2, "always"],
        "semi-style": ["error", "last"],
        "semi": ["error", "always"]
    }
};
