import React from 'react';
import Module from '../enumeration/Module';
import Utility from '../ultis/Ultility';
import BaseComponent from './BaseComponent';
class AuthenWrapper extends BaseComponent {
  constructor() {
    super(Module.Authen);
  }
  async componentDidMount() {
    var token = localStorage.getItem('token');
    if (Utility.isNullOrEmpty(token)) {
      if (this.props.location.pathname.includes('/presentation')) {
        this.props.history.push('/presentation/login');
      }
      if (this.props.location.pathname.includes('/management')) {
        this.props.history.push('/management/login');
      }
    } else {
      var res = await (await this.service.presentationVerifyToken({token: token})).json();
      if (res.success === false) {
        if (this.props.location.pathname.includes('/presentation')) {
          this.props.history.push('/presentation/login');
        }
        if (this.props.location.pathname.includes('/management')) {
          this.props.history.push('/management/login');
        }
      }
    }
  }

  render() {
    return (
      <div className='authen-wrapper'>
        {this.props.children}
      </div>
    );
  }
}

export default AuthenWrapper;
