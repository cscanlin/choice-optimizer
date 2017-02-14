import * as types from '../actions/actionTypes'
import defaultData from '../defaultData'
import { renameKey } from '../utils'

export default (state = defaultData, action) => {
  switch (action.type) {

    case types.ADD_NAME: {
      const choiceRanks = {}
      const choicesPerName = {}
      const newName = `name_${state.orderedNames.length + 1}`
      choiceRanks[newName] = state.orderedChoices.reduce((result, item) => {
        result[item] = 0
        return result
      }, {})
      choicesPerName[newName] = 1
      return {
        ...state,
        orderedNames: state.orderedNames.concat([newName]),
        choiceRanks: Object.assign(choiceRanks, state.choiceRanks),
        choicesPerName: Object.assign(choicesPerName, state.choicesPerName),
      }
    }

    case types.UPDATE_NAME: {
      const orderedNames = state.orderedNames.slice()
      orderedNames[orderedNames.indexOf(action.cellID)] = action.newValue
      return {
        ...state,
        choiceRanks: renameKey(state.choiceRanks, action.cellID, action.newValue),
        choicesPerName: renameKey(state.choicesPerName, action.cellID, action.newValue),
        orderedNames,
      }
    }

    case types.ADD_CHOICE: {
      const choiceRanks = {}
      const newChoice = `choice_${String.fromCharCode(state.orderedChoices.length + 97)}`
      Object.keys(state.choiceRanks).forEach(name =>
        choiceRanks[name][newChoice] = 0
      )
      return {
        ...state,
        orderedChoices: state.orderedChoices.concat([newChoice]),
        choiceRanks: Object.assign(choiceRanks, state.choiceRanks),
        maxPerChoice: Object.assign({ newChoice: 1 }, state.maxPerChoice),
      }
    }

    case types.UPDATE_CHOICE: {
      const choice = action.cellID.split('&')[1]
      const choiceRanks = {}
      Object.keys(state.choiceRanks).forEach(name =>
        choiceRanks[name] = renameKey(state.choiceRanks[name], choice, action.newValue)
      )
      const orderedChoices = state.orderedChoices.slice()
      orderedChoices[orderedChoices.indexOf(choice)] = action.newValue
      return {
        ...state,
        choiceRanks,
        orderedChoices,
        maxPerChoice: renameKey(state.maxPerChoice, choice, action.newValue),
      }
    }

    case types.UPDATE_RANK: {
      const [name, choice] = action.cellID.split('&')
      return {
        ...state,
        choiceRanks: {
          ...state.choiceRanks,
          [name]: {
            ...state.choiceRanks[name],
            [choice]: parseInt(action.newValue),
          },
        },
      }
    }

    case types.UPDATE_MAX_PER_CHOICE: {
      const choice = action.cellID.split('&')[1]
      const newEntry = { [choice]: parseInt(action.newValue) }
      return { ...state, maxPerChoice: Object.assign({}, state.maxPerChoice, newEntry) }
    }

    case types.UPDATE_CHOICES_PER_NAME: {
      const name = action.cellID.split('&')[0]
      const newEntry = { [name]: parseInt(action.newValue) }
      return { ...state, choicesPerName: Object.assign({}, state.choicesPerName, newEntry) }
    }

    case types.UPDATE_NO_REPEAT_CHOICES: {
      return { ...state, noRepeatChoices: action.newValue }
    }

    case types.REQUEST_SCORES:
      return { ...state, isFetching: true }

    case types.RECEIVE_SCORES:
      return {
        ...state,
        scores: action.scores,
        isFetching: false,
      }

    case types.RECEIVE_IMPORTED_DATA:
      return { ...state, ...action.importedData }

    default: {
      return state
    }
  }
}
