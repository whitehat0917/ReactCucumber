import * as React from 'react';

export function wrapComponent<T>(Comp: React.FunctionComponent<T>): React.FunctionComponent<T>;
export function wrapComponent<T>(Comp: React.ComponentClass<T>): React.ComponentClass<T>;
export function wrapComponent<T>(Comp: React.ComponentType<T>, additionalProps: Partial<T>): React.FunctionComponent<T>;

export function wrapComponent<T>(Comp: React.ComponentType<T>, additionalProps?: Partial<T>) {
  if (!additionalProps) return Comp;
  return (props: T) => <Comp {...props} {...additionalProps} />;
}

export function notEquals<T>(a: T) {
  return (b: T) => a !== b;
}

export function fixFn<T extends unknown[], R = any>(fn: (...e: any[]) => R, ...params: any[]) {
  return () => fn(...params);
}

export function mapFn1<T, U, R = any>(map: (t: T) => U, fn: (u: U) => R): (t: T) => R;
export function mapFn1<T, U, R = any>(map: (t: T) => U): (fn: (u: U) => R) => (t: T) => R;

export function mapFn1<T, U, R = any>(map: (t: T) => U, fn?: (u: U) => R) {
  if (!fn) {
    return (fn2: (u: U) => R) => (t: T) => fn2(map(t));
  }
  return (t: T) => fn(map(t));
}
export function mapFn<T extends unknown[], U extends unknown[], R = any>(
  map: (...t: [...T]) => U,
  fn?: (...e: [...U]) => R,
) {
  if (!fn) {
    return (fn2: (...e: [...U]) => R) => (...t: [...T]) => fn2(...map(...t));
  }
  return (...t: [...T]) => fn(...map(...t));
}
