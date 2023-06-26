import reducerCase from "./Constants";

export const initialState = {
    carousel: [],
    selectedSong: null,
    currentIndex: 0,
    tracklist: [],
    // change
    seed: null,
    query: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case reducerCase.SET_CAROUSEL:
            return {
                ...state,
                carousel: [...action.carousel],
            };
        case reducerCase.SET_SONG:
            return {
                ...state,
                selectedSong: action.song,
            }
        case reducerCase.SET_TRACKLIST:
            return {
                ...state,
                tracklist: [...state.tracklist, ...action.tracklist],
            }
        case reducerCase.CLEAR_TRACKLIST:
            return {
                ...state,
                tracklist: [],
            }
        case reducerCase.SET_CURRENTINDEX:
            return {
                ...state,
                currentIndex: action.currentIndex,
            }
        // change
        case reducerCase.SET_SEED:
            return {
                ...state,
                seed: action.seed,
            }
        case reducerCase.SET_QUERY:
            return {
                ...state,
                query: action.query,
            }
        default:
            state;
    }
}