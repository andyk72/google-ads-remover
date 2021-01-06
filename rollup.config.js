import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/GoogleAdsRemover.js',
        output: {
            file: 'lib/google-ads-remover.min.js',
            format: 'cjs'
        },
        plugins: [terser()]
    },
    {
        input: 'src/GoogleAdsRemover.js',
        output: {
            file: 'lib/google-ads-remover.js',
            format: 'cjs'
        }
    },
];