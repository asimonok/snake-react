import { saveState } from '../utils/storage'

export const permanent = ({ getState }) => {
  return next => action => {
    const returnValue = next(action)

    saveState(getState())

    return returnValue
  }
}
