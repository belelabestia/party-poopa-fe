export const make = (message: string) => new Error(message);
export const coalesce = (e: unknown) => e instanceof Error ? e : make(String(e));
