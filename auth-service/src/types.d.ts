export type AuthEventPayload<T> = { [K in keyof T]: T[K] } & { tag: string };
