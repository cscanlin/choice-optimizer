export const renameKey = (obj, oldKey, newKey) => {
  if (oldKey !== newKey) {
    obj[newKey] = obj[oldKey]
    delete obj[oldKey]
  }
  return obj
}

export const zipToObj = (ks, vs) => {
  return ks.reduce((o, k, i) => { o[k] = vs[i]; return o }, {})
}
