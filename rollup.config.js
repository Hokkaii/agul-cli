const path = require('path');
import rollupTypescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser";

export default [
    {
        input: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            file: path.resolve(__dirname, 'dist', 'index.js'),
            format: 'cjs',
            banner: '#!/usr/bin/env node',
        },
        plugins: [
            rollupTypescript({
                tsconfig: path.resolve(__dirname, './tsconfig_prod.json'),
            }),
            terser(),
        ],
        external: ['fs', 'path', 'ora', 'inquirer'],
    }
]
