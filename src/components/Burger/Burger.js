import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger =(props) => {
    const transformedIngredients=Object.keys(props.ingredients).map(igkey=> {
        return [...Array(props.ingredients[igkey])].
        map((_, i) => {return <BurgerIngredient key={igkey+i} type={igkey} />;
    });
    });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;