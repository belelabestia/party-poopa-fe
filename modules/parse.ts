import { isDateString } from './date';

type Maybe<T> =
  | { error: string, value?: undefined }
  | { value: T, error?: undefined };

declare const brand: unique symbol;
type Branded<T, K extends string> = T & { [brand]: K };

export const object = ({ error, value }: Maybe<unknown>) => {
  const make = (data: Maybe<object>) => ({
    ...data,
    property: (key: string) => property(data, key)
  });

  if (error !== undefined) return make({ error });
  if (typeof value !== 'object' || !value) return make({ error: 'should be an object' });

  return make({ value: value });
};

export const property = ({ error, value }: Maybe<object>, key: string) => {
  const make = (data: Maybe<unknown>) => ({
    ...data,
    number: () => number(data),
    string: () => string(data)
  });

  if (error !== undefined) return make({ error });

  const record = value as { [key: string]: unknown };
  if (key in record === false) return make({ error: `missing ${key} field` });

  return make({ value: record[key] });
};

export const array = ({ error, value }: Maybe<unknown>) => {
  const make = (data: Maybe<unknown[]>) => ({
    ...data,
    single: () => single(data),
    at: (i: number) => at(data, i)
  });

  if (error !== undefined) return make({ error });
  if (!Array.isArray(value)) return make({ error: 'should be an array' });

  return make({ value: value });
};

export const single = ({ error, value }: Maybe<unknown[]>) => {
  const make = (data: Maybe<unknown>) => ({
    ...data,
    object: () => object(data)
  });

  if (error !== undefined) return make({ error });
  if (value.length !== 1) return make({ error: 'should have one element' });

  return make({ value: value[0] });
};

export const at = ({ error, value }: Maybe<unknown[]>, i: number) => {
  const make = (data: Maybe<unknown>) => ({
    ...data,
    object: () => object(data)
  });

  if (error !== undefined) return make({ error });
  if (value[i] === undefined) return make({ error: `element at ${i} should be defined` });

  return make({ value: value[i] });
};

export const number = ({ error, value }: Maybe<unknown>) => {
  const make = (data: Maybe<number>) => ({
    ...data,
    greaterThanZero: () => greaterThanZero(data)
  });

  if (error !== undefined) return make({ error });
  if (typeof value !== 'number' || Number.isNaN(value)) return make({ error: 'should be a number' });

  return make({ value: value });
};

export type GreaterThanZero = Branded<number, 'greater than zero'>;

export const greaterThanZero = ({ error, value }: Maybe<number>) => {
  if (error !== undefined) return { error };
  if (value < 1) return { error: 'should be greater than zero' };

  return { value: value as GreaterThanZero };
};

export const string = ({ error, value }: Maybe<unknown>) => {
  const make = (data: Maybe<string>) => ({
    ...data,
    nonEmpty: () => nonEmpty(data),
    date: () => date(data)
  });

  if (error !== undefined) return make({ error });
  if (typeof value !== 'string') return make({ error: 'should be a string' });

  return make({ value: value });
};

export type NonEmpty = Branded<string, 'non empty'>;

export const nonEmpty = ({ error, value }: Maybe<string>) => {
  if (error !== undefined) return { error };
  if (value.trim().length === 0) return { error: 'should not be empty' };

  return { value: value as NonEmpty };
};

export type Date = Branded<string, 'date'>;

export const date = ({ error, value }: Maybe<string>) => {
  if (error !== undefined) return { error };
  if (!isDateString(value)) return { error: 'should be a date string (YYYY-MM-DD)' };

  return { value: value as Date };
};
