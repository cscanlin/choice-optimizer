import * as types from './actionTypes'

import { formatImportedCSV } from '../utils'

export const addName = () => ({
  type: types.ADD_NAME,
})

export const updateName = (cellID, newValue) => ({
  type: types.UPDATE_NAME,
  cellID,
  newValue,
})

export const addChoice = () => ({
  type: types.ADD_CHOICE,
})

export const updateChoice = (cellID, newValue) => ({
  type: types.UPDATE_CHOICE,
  cellID,
  newValue,
})

export const updateRank = (cellID, newValue) => ({
  type: types.UPDATE_RANK,
  cellID,
  newValue,
})

export const updateMaxPerChoice = (cellID, newValue) => ({
  type: types.UPDATE_MAX_PER_CHOICE,
  cellID,
  newValue,
})

export const updateChoicesPerName = (cellID, newValue) => ({
  type: types.UPDATE_CHOICES_PER_NAME,
  cellID,
  newValue,
})

export const updateNoRepeatChoices = newValue => ({
  type: types.UPDATE_NO_REPEAT_CHOICES,
  newValue,
})

export const requestScores = () => ({
  type: types.REQUEST_SCORES,
})

export const receiveScores = data => ({
  type: types.RECEIVE_SCORES,
  scores: data.scores,
  choiceSlack: data.choiceSlack,
  receivedAt: Date.now(),
})

export const fetchScores = (bodyData) => {
  return (dispatch) => {
    dispatch(requestScores(bodyData))
    return fetch('/optimize_choices', {
      method: 'POST',
      body: JSON.stringify(bodyData),
    }).then(response =>
      response.json()
    ).then(data =>
      dispatch(receiveScores(data))
    )
  }
}

export const receiveImportedData = importedData => ({
  type: types.RECEIVE_IMPORTED_DATA,
  importedData,
  receivedAt: Date.now(),
})

export const importFromCSV = (e) => {
  const reader = new FileReader()
  reader.readAsText(e.target.files[0])
  return (dispatch) => {
    reader.onload = (loadEvent) => {
      const formattedData = formatImportedCSV(loadEvent.target.result)
      dispatch(receiveImportedData(formattedData))
    }
  }
}

export const updateExportFormat = newValue => ({
  type: types.UPDATE_EXPORT_FORMAT,
  newValue,
})
