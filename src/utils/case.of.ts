export type EvalFunc<T, U extends unknown[], R> = (e: T, ...u: U) => R;
interface Case<T, U extends unknown[], R> {
  params: T | ((s: T) => boolean);
  eval?: (...e: [T, ...U]) => R;
  value?: R;
}
class CaseOf<T, U extends unknown[], R> {
  cases: Case<T, U, R>[] = [];
  _defaultCase?: Case<T, U, R>;
  _equality = (a: T, b: T) => a === b;
  case(...params: [T | ((s: T) => boolean), EvalFunc<T, U, R> | R]) {
    this.cases.push({
      params: params[0],
      eval: typeof params[1] === 'function' ? (params[1] as EvalFunc<T, U, R>) : undefined,
      value: typeof params[1] !== 'function' ? (params[1] as R) : undefined,
    });
    return this;
  }

  eval(...elems: [T, ...U]) {
    const selectedCase = this.cases.find((c) => {
      if (typeof c.params === 'function') {
        return (c.params as (s: T) => boolean)(elems[0]);
      }
      return this._equality(c.params, elems[0]);
    });
    const selected = selectedCase || this._defaultCase;
    if (!selected) return undefined;
    if (typeof selected.value !== 'undefined') return selected.value;
    return selected?.eval(...elems);
  }

  defaultCase(c: EvalFunc<T, U, R>) {
    this._defaultCase = { eval: c, params: [] as any };
    return this;
  }

  compile = () => {
    return (...elems: [T, ...U]) => this.eval(...elems);
  };
}

export function caseOf<T, U extends unknown[] = any, R = any>() {
  return new CaseOf<T, U, R>();
}
