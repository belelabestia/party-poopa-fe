export type Union<T extends Record<string, unknown>> = {
  [K in keyof T]: { [P in K]: T[K] } & { [P in Exclude<keyof T, K>]?: undefined }
}[keyof T];
