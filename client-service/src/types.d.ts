export type ClientEventPayload<T> = { [K in keyof T]: T[K] } & { tag: string };
