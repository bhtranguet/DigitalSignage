import React from "react";
import RouteWithSubRoutes from "../../common/component/RouteWithSubRoutes";
import Header from "../../Header";

class Management extends React.Component {
  render() {
    return (
      <div className='management'>
        <Header></Header>
        {
          this.props.children.map(route => {
            return <RouteWithSubRoutes key={route.path} route={route}></RouteWithSubRoutes>
          })
        }
      </div>
    )
  }
}

export default Management;