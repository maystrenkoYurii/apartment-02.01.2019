import imports from 'postcss-import';
import url from 'postcss-url';
import properties from 'postcss-custom-properties';
import mqpacker from 'css-mqpacker';
import smootheFonts from 'postcss-font-smoothing';
import modules from 'postcss-icss-selectors';
import reporter from 'postcss-reporter';
import gradients from 'postcss-easing-gradients';
import cssnano from 'cssnano';
import presetEnv from 'postcss-preset-env';
import calc from 'postcss-calc';
import mixin from 'postcss-mixins';
import fixesFlexbugs from 'postcss-flexbugs-fixes';
import cssFor from 'postcss-for';

import { paths } from './paths';

export const postCssLoader = (source = paths) => ({
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: loader => {
      return [
        imports({
          getPath: source,
          skipDuplicates: true,
        }),
        url({
          basePath: source,
        }),
        modules({
          mode: loader.resourcePath.includes('.global.css')
            ? 'global'
            : 'local',
        }),
        gradients(),
        properties(),
        smootheFonts(),
        presetEnv({
          stage: 0,
          features: {
            'nesting-rules': true,
            'color-mod-function': true,
            'custom-media': true,
          },
        }),
        mqpacker(),
        reporter(),
        cssnano(),
        calc(),
        mixin(),
        fixesFlexbugs(),
        cssFor(),
      ];
    },
    sourceMap: true,
  },
});
