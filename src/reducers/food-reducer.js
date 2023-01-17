const INITIAL_STATE = {
  foodList: [],
  error: null,
  fetching: false,
  fetched: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_ALIMENTE_PENDING":
      return { ...state, error: null, fetching: true, fetched: false };
    case "GET_ALIMENTE_FUFILLED":
      return {
        ...state,
        foodList: action.payload,
        fetching: false,
        fetched: true,
      };

    case "GET_ALIMENTE_REJECTED":
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,
      };

    default:
      return state;
  }
}
