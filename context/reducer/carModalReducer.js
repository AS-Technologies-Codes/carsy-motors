
export const carModalState = {
  visible: false,
  animating: false,
};

export function carModalReducer(state, action) {
  switch (action.type) {
    case "SET_VISIBLE":
      return { ...state, visible: action.payload };
    case "SET_ANIMATING":
      return { ...state, animating: action.payload };
    default:
      return state;
  }
}
