import { createContext, useContext, useReducer } from 'react';
import { optionReducerCase, initialOption, optionReducer } from './OptionReducer';

const OptionContext = createContext();

export const OptionState = ({ children }) => {

    // state
    const [state, dispatch] = useReducer(optionReducer, initialOption);
    // functions
    const setOption = (option) => {
        dispatch({
            type: optionReducerCase.SET_OPTION,
            option,
        })
    }
    const setCommute = (commute) => {
        dispatch({
            type: optionReducerCase.SET_COMMUTE,
            commute,
        })
    }
    const setRelax = (relax) => {
        dispatch({
            type: optionReducerCase.SET_RELAX,
            relax,
        })
    }
    const setEnergize = (energize) => {
        dispatch({
            type: optionReducerCase.SET_ENERGIZE,
            energize,
        })
    }
    const setWorkout = (workout) => {
        dispatch({
            type: optionReducerCase.SET_WORKOUT,
            workout,
        })
    }
    const setFocus = (focus) => {
        dispatch({
            type: optionReducerCase.SET_FOCUS,
            focus,
        })
    }

    return (
        <OptionContext.Provider value={{
            optionData: state,
            setOption,
            setCommute,
            setRelax,
            setEnergize,
            setWorkout,
            setFocus,
        }}>
            {children}
        </OptionContext.Provider>
    );
}

const useOptionState = () => useContext(OptionContext);
export default useOptionState;