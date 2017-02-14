import * as types from './actionTypes'

export const addName = () => {
  return {
    type: types.ADD_NAME,
  }
}

export const updateName = (cellID, newValue) => {
  return {
    type: types.UPDATE_NAME,
    cellID,
    newValue,
  }
}

export const addChoice = () => {
  return {
    type: types.ADD_CHOICE,
  }
}

export const updateChoice = (cellID, newValue) => {
  return {
    type: types.UPDATE_CHOICE,
    cellID,
    newValue,
  }
}

export const updateRank = (cellID, newValue) => {
  return {
    type: types.UPDATE_RANK,
    cellID,
    newValue,
  }
}

export const updateMaxPerChoice = (cellID, newValue) => {
  return {
    type: types.UPDATE_MAX_PER_CHOICE,
    cellID,
    newValue,
  }
}

export const updateChoicesPerName = (cellID, newValue) => {
  return {
    type: types.UPDATE_CHOICES_PER_NAME,
    cellID,
    newValue,
  }
}

export const updateNoRepeatChoices = (newValue) => {
  return {
    type: types.UPDATE_NO_REPEAT_CHOICES,
    newValue,
  }
}

export const requestScores = () => {
  return {
    type: types.REQUEST_SCORES,
  }
}

export const receiveScores = (scores) => {
  return {
    type: types.RECEIVE_SCORES,
    scores,
    receivedAt: Date.now(),
  }
}

export const fetchScores = (bodyData) => {
  console.log(bodyData)
  return (dispatch) => {
    dispatch(requestScores(bodyData))
    return fetch('/optimize_choices', {
      method: 'POST',
      body: JSON.stringify(bodyData),
    }).then(response =>
      response.json()
    ).then(scores =>
      dispatch(receiveScores(scores))
    )
  }
}
