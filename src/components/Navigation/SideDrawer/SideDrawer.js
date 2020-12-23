import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxillary';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    return(
        <Aux>
            <BackDrop show/>
        <div className={classes.SideDrawer}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;