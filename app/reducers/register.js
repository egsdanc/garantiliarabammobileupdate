const initialState = {
    dummy: true,
};

function registerReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default {
    default: registerReducer
};
