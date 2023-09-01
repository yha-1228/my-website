/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

// @see https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

// --------------------------------------------------

/**
 * `Array.map`のオブジェクト版
 */
function mapBy(object, callbackfn) {
  const newObject = {};

  Object.entries(object).forEach(([key, value]) => {
    const newValue = callbackfn(value, key);
    newObject[key] = newValue;
  });

  return newObject;
}

// --------------------------------------------------

/**
 * var(--base-line-height)の値と合わせる
 */
const baseLineHeight = 1.75;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // 忘れそうなので明示
      // https://tailwindcss.com/docs/screens
      sm: '640px',
      md: '768px',
      lg: '924px',
      // xl: '1280px',
      // '2xl': '1536px',
    },
    colors: {
      primary: colors.indigo,
      danger: colors.red,
      marker: colors.yellow[300],
      gray: {
        foreground: colors.gray[800],
        'foreground-weak': colors.gray[500],
        disabled: colors.gray[400],
        'light-300': colors.gray[300],
        'light-200': colors.gray[200],
        'light-100': colors.gray[100],
        'light-50': colors.gray[50],
      },
      white: colors.white,
      transparent: colors.transparent,
    },

    extend: {
      // @see https://tailwindcss.com/docs/font-family
      fontFamily: {
        base: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      // line-heightだけ共通の値で上書きする
      fontSize: mapBy(defaultTheme.fontSize, (fontSizeConfig) => [
        fontSizeConfig[0],
        { lineHeight: baseLineHeight.toString() },
      ]),
      // @see https://tailwindcss.com/docs/line-height
      lineHeight: {
        base: baseLineHeight.toString(),
      },
    },
  },
  plugins: [],
};
