import * as types from './actionTypes'

import { formatImportedCSV, formatImportedJSON } from '../utils'
import { OPTIMIZER_ENDPOINT } from '../constants/optimizerConstants'

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
  receivedAt: Date.now(),
  ...data,
})

export const tooManyCellsError = () => ({
  type: types.TOO_MANY_CELLS_ERROR,
  message: 'Too many cells; Must have less than 1,200 cells',
  success: false,
})

export const fetchScores = (bodyData) => {
  return (dispatch) => {
    dispatch(requestScores(bodyData))
    return fetch(OPTIMIZER_ENDPOINT, {
      headers: { 'Content-Type': 'application/json' },
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

export const clearData = () => ({
  type: types.CLEAR_DATA,
})

export const importDataFile = (e) => {
  let formattedData = {}
  const reader = new FileReader()
  reader.readAsText(e.target.files[0])
  const fileMime = e.target.files[0].type
  return (dispatch) => {
    dispatch(clearData())
    reader.onload = (loadEvent) => {
      switch (fileMime) {
        case 'text/csv':
          formattedData = formatImportedCSV(loadEvent.target.result)
          break
        case 'application/json':
          formattedData = JSON.parse(loadEvent.target.result)
          break
        default:
          formattedData = {}
      }
      dispatch(receiveImportedData(formattedData))
    }
  }
}

export const updateExportFormat = newValue => ({
  type: types.UPDATE_EXPORT_FORMAT,
  newValue,
})
