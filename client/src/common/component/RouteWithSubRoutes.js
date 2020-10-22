import React from "react";
import { Redirect, Route } from "react-router-dom";

class RouteWithSubRoutes extends React.Component {

  render() { 
    const route = this.props.route;
    const isRedirect = route.redirect ? true : false;
    const redirectLink = route.redirect ?? '';
    return (
      <div>
        {isRedirect ?
          <Route exact path={route.path}>
            <Redirect to={redirectLink}/>
          </Route>:
          <Route path={this.props.route.path} render={(props) => <route.component {...props} children={route.children}></route.component>}/>
        }
      </div>
      
    );
  }
}

export default RouteWithSubRoutes;