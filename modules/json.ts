export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonObject
  | JsonArray;

export type JsonObject = { [key: string]: JsonValue | undefined };
export type JsonArray = JsonValue[];
export type Json = JsonObject | JsonArray;
