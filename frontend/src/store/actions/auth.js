import * as actionTypes from './actionTypes';

export const authSaveToken = (token) => {
  return {
    type: actionTypes.AUTH_SAVE_TOKEN,
    token,
  }
}
