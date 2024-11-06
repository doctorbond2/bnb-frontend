export interface SearchReducerState {
  searchInput: string;
  searchResults: any[];
  isLoading: boolean;
  isFetching: boolean;
}
export const initialSearchState: SearchReducerState = {
  searchInput: '',
  searchResults: [],
  isLoading: false,
  isFetching: false,
};

export const searchReducerActionTypes = {
  SET_INPUT: 'SET_INPUT',
  SET_RESULTS: 'SET_RESULTS',
  SET_LOADING: 'SET_LOADING',
  SET_FETCHING: 'SET_FETCHING',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case searchReducerActionTypes.SET_INPUT:
      return { ...state, searchInput: action.payload };
    case searchReducerActionTypes.SET_RESULTS:
      return { ...state, searchResults: action.payload };
    case searchReducerActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case searchReducerActionTypes.SET_FETCHING:
      return { ...state, isFetching: action.payload };
    case searchReducerActionTypes.CLEAR_SEARCH:
      return {
        searchInput: '',
        searchResults: [],
        isLoading: false,
      };
    default:
      return state;
  }
};
