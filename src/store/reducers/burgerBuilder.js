import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};

const INGREDIENTS_PRICES ={
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.6,
}

const addIngredient =(state, action) => {
    const updatedIngredient={[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
            const updatedState={
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredientDec={[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
            const updatedIngredientsDec = updateObject(state.ingredients,updatedIngredientDec)
            const updatedStateDec={
                ingredients: updatedIngredientsDec,
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedStateDec);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const reducer =(state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
           return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return updateObject(state,{error: true});
    }
    return state;
}

export default reducer;