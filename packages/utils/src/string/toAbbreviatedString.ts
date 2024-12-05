export default function toAbbreviatedString({
  from,
  units = ["K", "M", "B", "T"],
  toFix = 0,
}: {
  from: number;
  units?: [
    thousand: string,
    million: string,
    billion: string,
    trillion: string
  ];
  toFix?: Parameters<Number["toFixed"]>[0];
}) {
  const tranform = (n: number) => {
    if (n < 1e3) return `${n}`;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(toFix) + units[0];
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(toFix) + units[1];
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(toFix) + units[2];
    if (n >= 1e12) return +(n / 1e12).toFixed(toFix) + units[3];
    return `${n}`;
  };

  if (from >= 0) return tranform(from);
  return `-${tranform(-1 * from)}`;
}