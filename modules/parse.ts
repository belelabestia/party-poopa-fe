import { isDateString } from './date';
import { Error, makeFail } from './error';
import { Union } from './union';

type ParseResult<T> = Union<{ error: Error, value: T }>;

declare const brand: unique symbol;
type Branded<T, K extends string> = T & { [brand]: K };

const fail = makeFail('parse error');

export const object = ({ error, value }: ParseResult<unknown>) => {
  const make = (data: ParseResult<object>) => ({
    ...data,
    property: (key: string) => property(data, key)
  });

  if (error) return make({ error });
  if (typeof value !== 'object' || !value) return make({ error: fail('should be an object') });

  return make({ value });
};

export const property = ({ error, value }: ParseResult<object>, key: string) => {
  const make = (data: ParseResult<unknown>) => ({
    ...data,
    number: () => number(data),
    string: () => string(data)
  });

  if (error) return make({ error });

  const record = value as { [key: string]: unknown };
  if (key in record === false) return make({ error: fail(`missing property ${key}`) });

  return make({ value: record[key] });
};

export const array = ({ error, value }: ParseResult<unknown>) => {
  const make = (data: ParseResult<unknown[]>) => ({
    ...data,
    single: () => single(data),
    at: (i: number) => at(data, i)
  });

  if (error) return make({ error });
  if (!Array.isArray(value)) return make({ error: fail('should be an array') });

  return make({ value: value });
};

export const single = ({ error, value }: ParseResult<unknown[]>) => {
  const make = (data: ParseResult<unknown>) => ({
    ...data,
    object: () => object(data)
  });

  if (error) return make({ error });
  if (value.length !== 1) return make({ error: fail('should have one element') });

  return make({ value: value[0] });
};

export const at = ({ error, value }: ParseResult<unknown[]>, i: number) => {
  const make = (data: ParseResult<unknown>) => ({
    ...data,
    object: () => object(data)
  });

  if (error) return make({ error });
  if (value[i] === undefined) return make({ error: fail(`element at ${i} should be defined`) });

  return make({ value: value[i] });
};

export const number = ({ error, value }: ParseResult<unknown>) => {
  const make = (data: ParseResult<number>) => ({
    ...data,
    greaterThanZero: () => greaterThanZero(data)
  });

  if (error) return make({ error });
  if (typeof value !== 'number' || Number.isNaN(value)) return make({ error: fail('should be a number') });

  return make({ value: value });
};

export type GreaterThanZero = Branded<number, 'greater than zero'>;

export const greaterThanZero = ({ error, value }: ParseResult<number>) => {
  if (error) return { error };
  if (value < 1) return { error: fail('should be greater than zero') };

  return { value: value as GreaterThanZero };
};

export const string = ({ error, value }: ParseResult<unknown>) => {
  const make = (data: ParseResult<string>) => ({
    ...data,
    nonEmpty: () => nonEmpty(data),
    date: () => date(data)
  });

  if (error) return make({ error });
  if (typeof value !== 'string') return make({ error: fail('should be a string') });

  return make({ value: value });
};

export type NonEmpty = Branded<string, 'non empty'>;

export const nonEmpty = ({ error, value }: ParseResult<string>) => {
  if (error) return { error };
  if (value.trim().length === 0) return { error: fail('should not be empty') };

  return { value: value as NonEmpty };
};

export type Date = Branded<string, 'date'>;

export const date = ({ error, value }: ParseResult<string>) => {
  if (error) return { error };
  if (!isDateString(value)) return { error: fail('should be a date string (YYYY-MM-DD)') };

  return { value: value as Date };
};
