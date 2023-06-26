import { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './Reducer';
import reducerCase from './Constants';

const AppContext = createContext();

export const AppState = ({ children }) => {

    // state
    const [state, dispatch] = useReducer(reducer, initialState);
    // functions
    const setCarousel = (carousel) => {
        dispatch({
            type: reducerCase.SET_CAROUSEL,
            carousel,
        })
    }
    const setSong = (song) =>{
        dispatch({
            type: reducerCase.SET_SONG,
            song,
        })
    }
    const setTracklist = (tracklist) => {
        dispatch({
            type: reducerCase.SET_TRACKLIST,
            tracklist,
        })
    }
    const clearTracklist = () => {
        dispatch({
            type: reducerCase.CLEAR_TRACKLIST,
        })
    }
    const setCurrentIndex = (currentIndex) => {
        dispatch({
            type: reducerCase.SET_CURRENTINDEX,
            currentIndex,
        })
    }
    // change
    const setSeed = (seed) => {
        dispatch({
            type: reducerCase.SET_SEED,
            seed,
        })
    }
    const setQuery = (query) => {
        dispatch({
            type: reducerCase.SET_QUERY,
            query,
        })
    }

    return (
        <AppContext.Provider value={{
            data: state,
            setCarousel,
            setSong,
            setTracklist,
            clearTracklist,
            setCurrentIndex,
            // change
            setSeed,
            setQuery,
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppState = () => useContext(AppContext);
export default useAppState;