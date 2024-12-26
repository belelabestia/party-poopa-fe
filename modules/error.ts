export type Cause = string | {};

export type Error = {
  name: string,
  cause: Cause;
};

export const makeFail = (name: string) => (cause: Cause): Error => ({ name, cause });
