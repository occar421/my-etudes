import {
  css as emotionCss,
  injectGlobal as emotionInjectGlobal,
  keyframes as emotionKeyframes,
} from "@emotion/css";
import { CSSInterpolation } from "@emotion/serialize";

const layerNames = {
  global: "global",
  components: "components",
};

emotionInjectGlobal`@layer ${layerNames.global}, ${layerNames.components};`;

function wrapStyleWithLayer(layerName: string, strings: readonly string[]) {
  return [`@layer ${layerName} {`, ...strings, "}"];
}

function wrapArgs(args: Array<CSSInterpolation>) {
  return ["", ...args, ""];
}

export const injectGlobal = (
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation>
) => {
  const newTemplate = wrapStyleWithLayer(layerNames.global, template);
  // @ts-ignore
  newTemplate.raw = wrapStyleWithLayer(layerNames.global, template.raw);
  const newArgs = wrapArgs(args);

  emotionInjectGlobal(newTemplate, ...newArgs);
};

export const componentCss = (
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation>
) => {
  const newTemplate = wrapStyleWithLayer(layerNames.components, template);
  // @ts-ignore
  newTemplate.raw = wrapStyleWithLayer(layerNames.components, template.raw);
  const newArgs = wrapArgs(args);

  console.log({ newTemplate, newArgs });

  // return emotionCss(newTemplate, ...newArgs);
  return emotionCss(template, ...args);
};

export const componentKeyframes = (
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation>
) => {
  const newTemplate = wrapStyleWithLayer(layerNames.components, template);
  // @ts-ignore
  newTemplate.raw = wrapStyleWithLayer(layerNames.components, template.raw);
  const newArgs = wrapArgs(args);

  return emotionKeyframes(newTemplate, ...newArgs);
};

// @TODO creat custom emotion binding for CSS Cascading layers
