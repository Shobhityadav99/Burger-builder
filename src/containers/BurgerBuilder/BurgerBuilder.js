import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount () {
        
    }

    updatePurchaseState (ingredients) {
        const sum=Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum,el) => {
            return sum+el;
        } ,0);
        return sum>0;
    }

    // addIngredientsHandler = (type) => {
    //     const oldCount=this.props.ings[type];
    //     const updatedCount=oldCount+1;
    //     const updateIngredients={
    //         ...this.props.ings
    //     };
    //     updateIngredients[type]=updatedCount;
    //     const priceAddition=INGREDIENTS_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=oldPrice+priceAddition;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updateIngredients,
    //     });
    //     this.updatePurchaseState(updateIngredients);
    // }

    // removeIngredientHandler =(type) => {
    //     const oldCount=this.props.ings[type];
    //     if(oldCount <= 0 ){
    //         return;
    //     }
    //     const updatedCount=oldCount-1;
    //     const updateIngredients={
    //         ...this.props.ings
    //     };
    //     updateIngredients[type]=updatedCount;
    //     const priceDeduction=INGREDIENTS_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=oldPrice-priceDeduction;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updateIngredients,
    //     });
    //     this.updatePurchaseState(updateIngredients);
    // }

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
        // const queryParams =[];
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i)+ "=" + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString=queryParams.join('&');
        this.props.history.push('/checkout');
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0
        }
        let orderSummary=null;
        
        let burger= <Spinner />
        if(this.props.ings){
        burger=(
        <Aux>
        <Burger ingredients={this.props.ings}></Burger>
        <BuildControls 
        ingredientsAdded={this.props.onIngredientAdded} 
        ingredientsRemoved={this.props.onIngredientRemoved}
        disabled={disabledInfo}
        price={this.props.price}
        purchasable={this.updatePurchaseState(this.props.ings)}
        ordered={this.purchaseHandler}
        ></BuildControls>
        </Aux>
        );
        orderSummary= <OrderSummary 
        price={this.props.price}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.props.ings}/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));