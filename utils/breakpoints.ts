export const pxToRem = (px: number): number => {
  return px / 16;
};

export const Breakpoints = {
  sm: `${pxToRem(480)}rem`,
  md: `${pxToRem(768)}rem`,
  lg: `${pxToRem(1024)}rem`,
  xl: `${pxToRem(1200)}rem`,
};
