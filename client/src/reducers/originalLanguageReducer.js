export const originalLanguageReducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE_ORIGINAL_LANGUAGE":
            return {
                ...state,
                originalLanguage: !state.originalLanguage
            };
        default: 
            return state;
    }
}