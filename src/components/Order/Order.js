import React from 'react';
import classes from './Order.css'
const order = (props) => (
    <div className={classes.order}>
        <p>Ingredients:</p>
        <p>Price: <strong>Rs 69</strong></p>
    </div>
);

export default order;