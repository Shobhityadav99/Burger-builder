import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
export function* initIngredientsSaga(action) {
    const response = yield axios.get('https://burger-builder-9c12f-default-rtdb.firebaseio.com/ingredients.json')
        try{ 
        yield put(actions.setIngredients(response.data));
        }
        catch(error) {
            yield put(actions.fetchIngredientsFailed());
        }
}