export const optionReducerCase = {
    SET_OPTION: "SET_OPTION",
    SET_COMMUTE: "SET_COMMUTE",
    SET_RELAX: "SET_RELAX",
    SET_ENERGIZE: "SET_ENERGIZE",
    SET_WORKOUT: "SET_WORKOUT",
    SET_FOCUS: "SET_FOCUS",
}

export const initialOption = {
    option: "home",
    commute: [],
    relax: [],
    energize: [],
    workout: [],
    focus: [],
}

export const optionReducer = (state, action) => {
    switch (action.type) {
        case optionReducerCase.SET_OPTION:
            return {
                ...state,
                option: action.option,
            }
        case optionReducerCase.SET_COMMUTE:
            return {
                ...state,
                commute: [...action.commute],
            }
        case optionReducerCase.SET_RELAX:
            return {
                ...state,
                relax: [...action.relax],
            }
        case optionReducerCase.SET_ENERGIZE:
            return {
                ...state,
                energize: [...action.energize],
            }
        case optionReducerCase.SET_WORKOUT:
            return {
                ...state,
                workout: [...action.workout],
            }
        case optionReducerCase.SET_FOCUS:
            return {
                ...state,
                focus: [...action.focus],
            }
        default:
            state;
    }
}