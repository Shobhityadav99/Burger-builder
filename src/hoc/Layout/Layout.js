import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props =>  {
    const [sideDrawerisVisible,setSideDrawerisVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerisVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerisVisible(!sideDrawerisVisible);
    }

        return (
            <Aux>
                <Toolbar 
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={sideDrawerisVisible}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
}

const mapStateToProps = state=> {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(layout);