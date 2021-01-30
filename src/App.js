import React, { useEffect , Suspense } from 'react';
import { Route, Switch , withRouter , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'; 

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
});

const app = props => {

  useEffect(() => {
    props.onTryAutoSignUp();
  },[]);

    let routes=(
      <Switch>
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to = "/" />
      </Switch>
    );
    if(props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/orders" render={() => <Orders />}/>
          <Route path="/checkout" render={() => <Checkout />}/>
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to = "/" />
      </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading.....</p>}>
          {routes}
          </Suspense>
        </Layout>
      </div>
    );
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps= dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(app));
