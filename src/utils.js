export const renameKey = (obj, oldKey, newKey) => {
  obj[newKey] = obj[oldKey]
  delete obj[oldKey]
  return obj
}
