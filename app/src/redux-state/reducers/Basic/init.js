import init from 'shared/types/Basic/init';
import initial from 'store/initial';

export default (state, action) => {
  if (state === undefined) {
    return initial;
  }
  switch (action.type) {
    case init:
      return initial;
    default:
      return state;
  }
};
