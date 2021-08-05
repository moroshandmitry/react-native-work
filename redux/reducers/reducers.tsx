import {
  defaultState,
  TypesDefaultStateOfRedux,
} from '../globalState/globalState';

import {ACTION_TYPES} from '../actionTypes/actionTypes';

export const reducers = (
  state: TypesDefaultStateOfRedux = defaultState,
  action: any,
) => {
  switch (action.type) {
    case ACTION_TYPES.SOME_TEXT:
      return {...state, text: state.text + action.payload};

    default:
      return state;
  }
};
