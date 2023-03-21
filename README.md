# project setup
$ npx create-expo-app .
$ touch tsconfig.json
$ npx expo start

# Linting
1.
$ npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/eslint @types/react @types/react-native eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native

2.
$ touch .eslintrc.cjs
  ```
/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: [
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: 'tsconfig.json',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
    ],
    rules: {
        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
    },
};

module.exports = config;

  ```
3.
$ touch .eslingignore
  ```
  node_modules

  ```
4.
add ```"lint": "eslint . --ext .js,.jsx,.ts,.tsx"``` to "scripts" key of package.json

5. add to tsconfig if not already there
```
   {
    "compilerOptions": {
        "strict": true
    },
    "exclude": ["node_modules"],
    "include": [".eslintrc.cjs", "**/*.ts", "**/*.tsx", "**/*.cjs", "**/*.mjs"],
    "extends": "expo/tsconfig.base"
}
```

# Navigation
$ npm install @react-navigation/native
$ npx expo install react-native-screens react-native-safe-area-context

# Native-Stack Navigator
$ npm install @react-navigation/native-stack

# Tab Navigator
$ npm install @react-navigation/bottom-tabs

# Drawer Navigator
$ npm install @react-navigation/drawer
$ npm install react-native-gesture-handler react-native-reanimated
>> add this to babel.config.js
```
       plugins: [
            [
                'react-native-reanimated/plugin',
                { relativeSoureLLocation: true },
            ],
        ],
```

# Redux Tookit
$ npm install @reduxjs/toolkit react-redux
$ npm i -D @types/react-redux

# nanoid
$ npm i nanoid react-native-get-random-values
$ npm i -D @types/react-native-get-random-values
```
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';
```

# zod validation
$ npm i zod zod-validation-error
```
import {z} from 'zod'
import {fromZodError} from 'zod-validation-error'
```