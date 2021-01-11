import * as actionTypes from '../actions/actionTypes';

const initialState={
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICES ={
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.6,
}

const reducer =(state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
    }
    return state;
}

export default reducer;