export type Error = {
  name: string,
  cause?: unknown;
};

export const makeFail = (name: string) => (cause?: unknown): Error => ({ name, cause });
