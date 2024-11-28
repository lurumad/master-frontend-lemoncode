{
    "compilerOptions": {
      "lib": ["DOM", "DOM.Iterable", "ESNext"],
      "target": "ES5",
      "module": "ESNext",
      // "moduleResolution": "node", // Use node resolution for "undici types" issue
      "allowJs": true,
      "outDir": "transpiled"
    },
    "compileOnSave": true,
    "exclude": ["node_modules"],
    "include": ["src"]
  }