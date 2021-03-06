import download from 'downloadjs'

export const prettyJSON = (obj) => {
  return JSON.stringify(obj, null, 4)
}

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
  rows.slice(1).forEach((row) => {
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

export const asGrid = (state) => {
  const headers = ['names'].concat(state.orderedChoices).join()
  const dataRows = state.orderedNames.map((name) => {
    return [name].concat(state.orderedChoices.map((choice) => {
      return state.scores[name][choice]
    })).join()
  })
  return download([headers].concat(dataRows).join('\n'), 'optimization_scores.csv', 'text/csv')
}

export const byName = (state) => {
  const formattedbyName = {}
  state.orderedNames.forEach((name) => {
    formattedbyName[name] = []
    state.orderedChoices.forEach((choice) => {
      const nameChoiceScore = state.scores[name][choice]
      if (nameChoiceScore > 0) {
        const choices = Array(nameChoiceScore).fill(choice)
        formattedbyName[name] = formattedbyName[name].concat(choices)
      }
    })
  })
  return download(prettyJSON(formattedbyName), 'optimization_scores.json', 'application/json')
}

export const byChoice = (state) => {
  const formattedbyChoice = {}
  state.orderedChoices.forEach((choice) => {
    formattedbyChoice[choice] = []
    state.orderedNames.forEach((name) => {
      const nameChoiceScore = state.scores[name][choice]
      if (nameChoiceScore > 0) {
        const names = Array(nameChoiceScore).fill(name)
        formattedbyChoice[choice] = formattedbyChoice[choice].concat(names)
      }
    })
  })
  return download(prettyJSON(formattedbyChoice), 'optimization_scores.json', 'application/json')
}

export const exportInputData = (state) => {
  const formattedInputData = {
    orderedNames: state.orderedNames,
    orderedChoices: state.orderedChoices,
    choiceRanks: state.choiceRanks,
    choicesPerName: state.choicesPerName,
    maxPerChoice: state.maxPerChoice,
  }
  return download(prettyJSON(formattedInputData), 'choice_optimizer_input.json', 'application/json')
}
