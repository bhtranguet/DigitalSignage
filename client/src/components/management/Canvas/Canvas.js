import React from "react";
import RouteWithSubRoutes from "../../../common/component/RouteWithSubRoutes";

class Canvas extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.children.map(route => {
            return <RouteWithSubRoutes key={route.path} route={route}></RouteWithSubRoutes>
          })
        }
      </div>
    )
  }
}

export default Canvas;