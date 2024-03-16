export function findIndex<T>(array: T[], bySearch: T) {
  return array.findIndex((el) => el === bySearch);
}
