import React from "react";
import RouteWithSubRoutes from "../../common/component/RouteWithSubRoutes";
import {Link} from "react-router-dom"

class Management extends React.Component {
  render() {
    return (
      <div className='management'>
        <div className="management-header">
          <div className="left">
            <div className="logo">
              <img src="/images/logo.png" alt="" />
            </div>
            <div className="btn-collapse">
              <i class="fas fa-bars"></i>
            </div>
          </div>
          <div className="right">
            <div className="user-info">John Smith</div>
            <div className="btn-setting"><i class="fas fa-cog"></i></div>
          </div>
        </div>
        <div className="management-body">
          <div className="left">
            <div className="menu">
              <div className="menu-item"><Link to="/management/screen"></Link><i class="fas fa-desktop"></i>Màn hình</div>
              <div className="menu-item"><i class="fas fa-columns"></i>Panel</div>
              <div className="menu-item"><i class="far fa-square"></i>Frame</div>
            </div>
          </div>
          <div className='right'>
            {
              this.props.children.map(route => {
                return <RouteWithSubRoutes key={route.path} route={route}></RouteWithSubRoutes>
              })
            }
          </div>
        </div>

      </div>
    )
  }
}

export default Management;