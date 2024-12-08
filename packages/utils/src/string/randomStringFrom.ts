export default function randomStringFrom(stringValues: string[]) {
  const randomSelection = (n: number) => {
    // eslint-disable-next-line prefer-const
    let newArr: string[] = [];
    if (n >= stringValues.length) {
      return stringValues;
    }
    for (let i = 0; i < n; i++) {
      let newElem =
        stringValues[Math.floor(Math.random() * stringValues.length)];
      //@ts-ignore
      while (newArr.includes(newElem)) {
        newElem = stringValues[Math.floor(Math.random() * stringValues.length)];
      }
      //@ts-ignore
      newArr.push(newElem);
    }
    return newArr;
  };

  return randomSelection(1)[0];
}