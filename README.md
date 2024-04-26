# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## How Redux-persist is integrated:

1.  When the app load, redux-persist rehydrates the Redux store's state from the persisted storage (localStorage). If there's persisted date (auth toke and user information), it will be loaded into the auth slice of the Redux state.
2.  The apiSlice uses the getState methoin the prepareHeaders func to acces the surrent state and include the auth token n the header of API requests.
3.  When a 403 error occurs (expired token), baseQueryWithReauth logic in apiSlice will attempt to refresh the token and retry the original query.
4.  When the setCredentials or clearCredentials actions are dispatched, the changes to the state will be automatically persisted thanks to redux-persist.

## Sources:

https://www.youtube.com/watch?v=-JJFQ9bkUbo&t=1654s
https://github.com/gitdagray/redux_jwt_auth/tree/main
