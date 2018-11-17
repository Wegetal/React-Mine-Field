const INITIAL_STATE = {
  fields: [],
  mines: null
};

function MineReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case "UPDATE_FIELD_ON_REVEAL":
      return Object.assign({}, state, { fields: action.fields });
    case "UPDATE_MINES":
      return Object.assign({}, state, { mines: action.mines });
    default:
      return INITIAL_STATE;
  }
}

export default MineReducer;
