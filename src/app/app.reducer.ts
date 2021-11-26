export interface State {
  isLoading: boolean;
}
const initState: State = {
  isLoading: false,
};

export function appReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'START_LOADING':
      return { isLoading: true };
    case 'STOP_LOADING':
      return { isLoading: false };
    default:
      return state;
  }
}
