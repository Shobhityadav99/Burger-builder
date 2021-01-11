import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

export const setIngredients = ( ingredients ) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed= () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-9c12f-default-rtdb.firebaseio.com/ingredients.json')
        .then(respone => {
            dispatch(setIngredients(respone.data))
        }).catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}