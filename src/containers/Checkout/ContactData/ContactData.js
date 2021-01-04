import React , { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state ={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    }
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading: true})
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        axios.post('/orders.json',order).then(respone => {
            this.setState({loading: false});
            this.props.history.push('/')
        }
        ).catch(
            error => {this.setState({loading: false})}
        );
        alert('You can continue!');
    }
    render() {
        let form =(
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
                    <input className={classes.Input} type="text" name="email" placeholder="Enter your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Enter your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Enter your Postal Code" />
                    <Button btnType="Success">ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter your contact Details</h3>
                {form}
            </div>
        );
    }
}

export default ContactData;