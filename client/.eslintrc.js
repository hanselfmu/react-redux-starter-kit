module.exports = {
    "extends": "eslint-config-airbnb",
    "env": {
        "browser": true
    },
    "rules": {
        "new-cap": [2, {"capIsNewExceptions": ["List", "Map", "Set"]}],
        "react/no-multi-comp": 0,
        "import/default": 0,
        "import/no-duplicates": 0,
        "import/named": 0,
        "import/namespace": 0,
        "import/no-unresolved": 0,
        "import/no-named-as-default": 2,
        "comma-dangle": 0,
        "indent": [1, 4, {"SwitchCase": 1}],
        "no-console": 0,
        "no-alert": 2,
        "max-len": 0,
        "arrow-parens": [2, "as-needed"]
    },
    "plugins": [
        "react", "import"
    ],
    "settings": {
        "import/parser": "babel-eslint",
        "import/resolve": {
            "moduleDirectory": ["node_modules", "src"]
        }
    },
    "globals": {
        "__DEVELOPMENT__": true,
        "__CLIENT__": true,
        "__SERVER__": true,
        "__DISABLE_SSR__": true,
        "__DEVTOOLS__": true,
        "socket": true,
        "webpackIsomorphicTools": true
    }
}