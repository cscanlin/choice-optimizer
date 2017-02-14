export const renameKey = (obj, oldKey, newKey) => {
  const newObj = {}
  if (oldKey !== newKey) {
    newObj[newKey] = obj[oldKey]
    delete obj[oldKey]
  }
  return Object.assign(newObj, obj)
}

export const zipToObj = (ks, vs) => {
  return ks.reduce((o, k, i) => { o[k] = vs[i]; return o }, {})
}

export const formatImportedCSV = (CSVString) => {
  const rows = CSVString.trim().split('\n').map(row => row.split(','))
  const orderedChoices = rows[0].slice(1)
  const orderedNames = []
  const choiceRanks = {}
  const choicesPerName = {}
  rows.slice(1).forEach(row => {
    const name = row[0]
    orderedNames.push(name)
    choiceRanks[name] = zipToObj(orderedChoices, row.slice(1).map(rank => parseInt(rank)))
    choicesPerName[name] = 1
  })
  const defaultNumPerChoice = Math.ceil(orderedNames.length / orderedChoices.length)
  const maxPerChoice = zipToObj(
    orderedChoices,
    Array.from(orderedChoices, () => defaultNumPerChoice)
  )
  return {
    orderedNames,
    orderedChoices,
    choiceRanks,
    choicesPerName,
    maxPerChoice,
    scores: {},
  }
}
