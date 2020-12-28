import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES ={
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.6,
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState (ingredients) {
        const sum=Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum,el) => {
            return sum+el;
        } ,0);
        this.setState({purchasable: sum>0})
    }

    addIngredientsHandler = (type) => {
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updateIngredients={
            ...this.state.ingredients
        };
        updateIngredients[type]=updatedCount;
        const priceAddition=INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients,
        });
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler =(type) => {
        const oldCount=this.state.ingredients[type];
        if(oldCount <= 0 ){
            return;
        }
        const updatedCount=oldCount-1;
        const updateIngredients={
            ...this.state.ingredients
        };
        updateIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients,
        });
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler =() =>  {
        this.setState({
            purchasing: true,
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler=() => {
        const order={
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Shobhit',
                address: {
                    street: 'nukkad',
                    zipCode: '144001',
                    country: 'India',
                },
                email: 'test@test.com',
            },
            deliverymode: 'fastest'
        }
        axios.post('/orders.json',order).then(respone => 
            console.log(respone)
        ).catch(
            error => console.log(error)
        );
        // alert('You can continue!');
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                ingredientsAdded={this.addIngredientsHandler} 
                ingredientsRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                ></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;