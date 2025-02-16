import type { Moment } from "moment";
import moment from "moment";

export const by = {
  alphabet: {
    /**
     * @example
     * ['a','b','c','e','d','g'].sort(by.alphabet.asc())
     * @example
     * users.sort(by.alphabet.asc('fullname'))
     * @example
     * users.sort(by.alphabet.asc(u => `${u.firstName} ${u.lastName}`))
     */
    asc: <T extends { [x: string]: any }>(field?: string | ((value: T) => string)) =>
      (a: T | string, b: T | string) => {
        if (typeof a === "string" && typeof b === "string")
          return a.localeCompare(b);

        if (typeof a === "string" || typeof b === "string") return 0;

        if (typeof field === "string") {
          // eslint-disable-next-line prefer-const
          let [s1, s2] = [a[field] as string, b[field] as string];
          return s1.localeCompare(s2);
        }

        if (typeof field === "function") {
          // eslint-disable-next-line prefer-const
          let [s1, s2] = [field(a), field(b)];
          return s1.localeCompare(s2);
        }

        return 0;
      },
    /**
     * @example
     * ['a','b','c','e','d','g'].sort(by.alphabet.desc())
     * @example
     * users.sort(by.alphabet.desc('fullname'))
     * @example
     * users.sort(by.alphabet.desc(u => `${u.firstName} ${u.lastName}`))
     */
    desc: <T extends { [x: string]: any }>(field?: string | ((value: T) => string)) =>
      (a: T | string, b: T | string) => {
        if (typeof a === "string" && typeof b === "string")
          return b.localeCompare(a);

        if (typeof a === "string" || typeof b === "string") return 0;

        if (typeof field === "string") {
          // eslint-disable-next-line prefer-const
          let [s1, s2] = [b[field] as string, a[field] as string];
          return s1.localeCompare(s2);
        }

        if (typeof field === "function") {
          // eslint-disable-next-line prefer-const
          let [s1, s2] = [field(b), field(a)];
          return s1.localeCompare(s2);
        }

        return 0;
      }
  },
  moment: {
    /**
     * @example
     * [date1, date3, date7, date5, date4].sort(by.moment.asc())
     * @example
     * users.sort(by.moment.asc('dayOfBirth'))
     * @example
     * users.sort(by.moment.asc(u => getDayOfBirth(u)))
     */
    asc: <T extends { [x: string]: any }>(field?: string | ((value: T) => Moment)) =>
      (a: T | Moment, b: T | Moment) => {
        if (moment.isMoment(a) && moment.isMoment(b)) return a.diff(b);

        if (moment.isMoment(a) || moment.isMoment(a)) return 0;

        if (typeof field === "string") {
          // eslint-disable-next-line prefer-const
          let [n1, n2] = [(a as T)[field] as Moment, (b as T)[field] as Moment];
          const _diff = n1.diff(n2);
          return _diff === 0 ? 0 : _diff > 0 ? -1 : 1;
        }

        if (typeof field === "function") {
          // eslint-disable-next-line prefer-const
          let [n1, n2] = [field(a as T), field(b as T)];
          const _diff = n1.diff(n2);
          return _diff === 0 ? 0 : _diff > 0 ? -1 : 1;
        }

        return 0;
      },
    /**
     * @example
     * [date1, date3, date7, date5, date4].sort(by.moment.desc())
     * @example
     * users.sort(by.moment.desc('dayOfBirth'))
     * @example
     * users.sort(by.moment.desc(u => getDayOfBirth(u)))
     */
    desc: <T extends { [x: string]: any }>(field?: string | ((value: T) => Moment)) =>
      (a: T | Moment, b: T | Moment) => {
        if (moment.isMoment(a) && moment.isMoment(b)) return b.diff(a);

        if (moment.isMoment(a) || moment.isMoment(a)) return 0;

        if (typeof field === "string") {
          // eslint-disable-next-line prefer-const
          let [n1, n2] = [
            (a as T)[field] as Moment,
            (b as T)[field] as Moment,
          ];
          const _diff = n2.diff(n1);
          return _diff === 0 ? 0 : _diff > 0 ? -1 : 1;
        }

        if (typeof field === "function") {
          // eslint-disable-next-line prefer-const
          let [n1, n2] = [field(a as T), field(b as T)];
          const _diff = n2.diff(n1);
          return _diff === 0 ? 0 : _diff > 0 ? -1 : 1;
        }

        return 0;
      }
  },
    /**
     * @example
     * [3, 6, 1, 4, 4, 8].sort(by.number.asc())
     * @example
     * users.sort(by.number.asc('age'))
     * @example
     * users.sort(by.number.asc(u => toDay - u.dayOfBirth))
     */
  number: {
    asc: <T extends { [x: string]: any }>(field?: string | ((value: T) => number)) =>
      (a: T | number, b: T | number) => {
      if (typeof a === "number" && typeof b === "number") {
        // eslint-disable-next-line prefer-const
        let [n1, n2] = [a, b];
        return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
      }

      if (typeof a === "number" || typeof b === "number") return 0;

      if (typeof field === "string") {
        // eslint-disable-next-line prefer-const
        let [n1, n2] = [a[field] as number, b[field] as number];

        return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
      }

      if (typeof field === "function") {
        // eslint-disable-next-line prefer-const
        let [n1, n2] = [field(a), field(b)];
        return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
      }

      return 0;
    },
    /**
     * @example
     * [3, 6, 1, 4, 4, 8].sort(by.number.desc())
     * @example
     * users.sort(by.number.desc('age'))
     * @example
     * users.sort(by.number.desc(u => toDay - u.dayOfBirth))
     */
    desc: <T extends { [x: string]: any }>(field?: string | ((value: T) => number)) =>
      (a: T | number, b: T | number) => {
      if (typeof a === "number" && typeof b === "number") {
        // eslint-disable-next-line prefer-const
        let [n1, n2] = [b, a];
        return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
      }

      if (typeof a === "number" || typeof b === "number") return 0;

      if (typeof field === "string") {
        // eslint-disable-next-line prefer-const
        let [n1, n2] = [b[field] as number, a[field] as number];

        return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
      }

      if (typeof field === "function") {
        // eslint-disable-next-line prefer-const
        let [n1, n2] = [field(b), field(a)];
        return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
      }

      return 0;
    }
  }
}

/**
 * @example
  import { inTheFollowingOrders, by } from "@shared/utils/array/sort"

  const sortedUsers = user.sort(inTheFollowingOrders(
    by.alphabet.asc(u => `${u.firstName} ${u.lastName}`),
    by.number.desc('age'),
    by.moment.desc('joinDate')),
  );
 */
export function inTheFollowingOrders<T>(
  ...compareFn: ((a: T, b: T) => number)[]
) {
  return function (a: T, b: T) {
    let i = 0,
      compare = 0;
    while (compare === 0 && i < compareFn.length) {
      // @ts-ignore
      if (typeof compareFn[i] === "function") compare = compareFn[i](a, b) || 0;
      i++;
    }
    return compare;
  };
}