import * as types from '../actions/actionTypes'
import defaultData from '../defaultData'
import { renameKey } from '../utils'

export default (state = defaultData, action) => {
  switch (action.type) {

    case types.ADD_NAME: {
      const choiceRanks = state.choiceRanks
      const choicesPerName = state.choicesPerName
      const newName = `name_${state.orderedNames.length + 1}`
      choiceRanks[newName] = state.orderedChoices.reduce((result, item) => {
        result[item] = 0
        return result
      }, {})
      choicesPerName[newName] = 1
      return {
        ...state,
        orderedNames: state.orderedNames.concat([newName]),
        choiceRanks,
        choicesPerName,
      }
    }

    case types.UPDATE_NAME: {
      let choiceRanks = state.choiceRanks
      const orderedNames = state.orderedNames
      choiceRanks = renameKey(choiceRanks, action.cellID, action.newValue)
      orderedNames[orderedNames.indexOf(action.cellID)] = action.newValue
      return {
        ...state, choiceRanks, orderedNames,
      }
    }

    case types.ADD_CHOICE: {
      const choiceRanks = state.choiceRanks
      const maxPerChoice = state.maxPerChoice
      const newChoice = `choice_${String.fromCharCode(state.orderedChoices.length + 97)}`
      Object.keys(choiceRanks).forEach(name =>
        choiceRanks[name][newChoice] = 0
      )
      maxPerChoice[newChoice] = 1
      return {
        ...state,
        orderedChoices: state.orderedChoices.concat([newChoice]),
        choiceRanks,
        maxPerChoice,
      }
    }

    case types.UPDATE_CHOICE: {
      const choice = action.cellID.split('&')[1]
      const choiceRanks = state.choiceRanks
      const orderedChoices = state.orderedChoices
      let maxPerChoice = state.maxPerChoice
      Object.keys(choiceRanks).forEach(name =>
        choiceRanks[name] = renameKey(choiceRanks[name], choice, action.newValue)
      )
      maxPerChoice = renameKey(maxPerChoice, choice, action.newValue)
      orderedChoices[orderedChoices.indexOf(choice)] = action.newValue
      return {
        ...state, choiceRanks, orderedChoices, maxPerChoice,
      }
    }

    case types.UPDATE_RANK: {
      const choiceRanks = state.choiceRanks
      const [name, choice] = action.cellID.split('&')
      choiceRanks[name][choice] = parseInt(action.newValue)
      return { ...state, choiceRanks }
    }

    case types.UPDATE_MAX_PER_CHOICE: {
      const choice = action.cellID.split('&')[1]
      const maxPerChoice = state.maxPerChoice
      maxPerChoice[choice] = parseInt(action.newValue)
      return { ...state, maxPerChoice }
    }

    case types.UPDATE_CHOICES_PER_NAME: {
      const name = action.cellID.split('&')[0]
      const choicesPerName = state.choicesPerName
      choicesPerName[name] = parseInt(action.newValue)
      return { ...state, choicesPerName }
    }

    case types.UPDATE_NO_REPEAT_CHOICES: {
      // action.newValue= e.target.checked
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

    default: {
      return state
    }
  }
}
