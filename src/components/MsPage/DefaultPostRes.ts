export type DefaultPostRes<R> = R extends { data?: infer U } ? U : R;
