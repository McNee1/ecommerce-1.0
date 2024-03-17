export function chunkArray<T>(array: T[], chunkLength: number) {
  const slicedArray = [];

  for (let i = 0; i < array.length; i += chunkLength) {
    slicedArray.push(array.slice(i, i + chunkLength));
  }
  return slicedArray;
}
