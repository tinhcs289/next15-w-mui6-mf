export const ZONE_PATH = "blog";

const PATHS = {
  main: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
};
export default PATHS;

export const ALL_PATHS = Object.keys(PATHS).reduce(
(l, k) => [...l, PATHS[k as keyof typeof PATHS]],
[] as string[]
);