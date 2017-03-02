import * as types from '../actions/actionTypes'
import { renameKey } from '../utils'
import defaultData from '../defaultData.json'
import { SERVER_ERROR_MESSAGE } from '../constants/optimizerConstants'

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
      Object.keys(state.choiceRanks).forEach((name) => {
        choiceRanks[name] = Object.assign({ [newChoice]: 0 }, state.choiceRanks[name])
      })
      return {
        ...state,
        choiceRanks,
        orderedChoices: state.orderedChoices.concat([newChoice]),
        // TODO: change all Object.assign updates to below style if possible
        maxPerChoice: { ...state.maxPerChoice, [newChoice]: 1 },
      }
    }

    case types.UPDATE_CHOICE: {
      const choice = action.cellID.split('&')[1]
      const choiceRanks = {}
      Object.keys(state.choiceRanks).forEach(name =>
        (choiceRanks[name] = renameKey(state.choiceRanks[name], choice, action.newValue))
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
        choiceSlack: action.choiceSlack,
        isFetching: false,
        message: action.statusCode === 500 ? SERVER_ERROR_MESSAGE : action.message,
        showMessage: !action.success,
        messageType: action.success ? null : 'error',
      }

    case types.TOO_MANY_CELLS_ERROR:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        messageType: 'error',
      }

    case types.RECEIVE_IMPORTED_DATA:
      return {
        ...state,
        ...action.importedData,
      }

    case types.UPDATE_EXPORT_FORMAT:
      return { ...state, exportFormat: action.newValue }

    case types.CLEAR_DATA:
      return {
        ...state,
        orderedNames: [],
        orderedChoices: [],
        choiceRanks: {},
        choicesPerName: {},
        maxPerChoice: {},
        scores: {},
        choiceSlack: {},
      }
    default: {
      return state
    }
  }
}
