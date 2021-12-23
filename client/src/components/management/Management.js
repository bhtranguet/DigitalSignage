import React from "react";
import RouteWithSubRoutes from "../../common/component/RouteWithSubRoutes";
import { Link } from "react-router-dom";
import $ from 'jquery';

class Management extends React.Component {
  
  componentDidMount() {
    var me = this;
    $(".management-body .menu-item").each(function (index) {
      var href = $(this).attr('href');
      var browserUrl = me.props.location.pathname;
      if (browserUrl.includes(href)) {
        $(this).addClass('active');
      }
    });

    $(".management-body .menu-item").click(function () {
      $(".management-body .menu-item").removeClass('active');
      $(this).addClass('active');
    })
  }

  render() {
    return (
      <div className='management'>
        <div className="management-header">
          <div className="left">
            <div className="logo">
              <img src="/images/logo.png" alt="" />
            </div>
            <div className="btn-collapse">
              <i className="fas fa-bars"></i>
            </div>
          </div>
          <div className="right">
            <div className="user-info">John Smith</div>
            <div className="btn-setting"><i className="fas fa-cog"></i></div>
          </div>
        </div>
        <div className="management-body">
          <div className="left">
            <div className="menu">
              <Link className="menu-item" to="/management/screen">
                <i className="fas fa-desktop"></i>Màn hình
              </Link>
              <Link className="menu-item" to="/management/canvas">
                <i className="fas fa-columns"></i>Canvas
              </Link>
              <Link className="menu-item" to="/management/panel">
                <i className="far fa-square"></i>Panel
              </Link>
              <Link className="menu-item" to="/management/frame">
                <i className="fas fa-image"></i>Frame
              </Link>
              <Link className="menu-item" to="/management/caption">
                <i className="fas fa-font"></i>Caption
              </Link>
              <Link className="menu-item" to="/management/media">
                <i className="fas fa-photo-video"></i>Thư viện
              </Link>
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

      </div >
    )
  }
}

export default Management;