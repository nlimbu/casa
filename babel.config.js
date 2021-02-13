module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "env": {
    "production": {},
  },
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
    ['module-resolver', {
      "extensions": [
        ".ios.ts",
        ".android.ts",
        ".ts",
        ".ios.tsx",
        ".android.tsx",
        ".tsx",
        ".jsx",
        ".js",
        ".json",
      ],
      "root": ["./"],
      "alias": {
          "components": './app/components',
          "config": './app/config',
          "navigation": './app/navigation',
          "screens": './app/screens',
          "services": './app/services',
          "theme": './app/theme',
          "utils": './app/utils',
          "images": './images',
      },
  }]
  ],
}
