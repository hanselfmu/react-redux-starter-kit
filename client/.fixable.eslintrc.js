module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "rules": {
        "semi": 2,  // oh god behold the ugliness...
        "no-extra-semi": 2,
        "eol-last": 2,
        "comma-dangle": 2,
        "jsx-quotes": 2,
        "no-var": 2
    },
    "plugins": [
        "react", "import"
    ]
}