import React from 'react';
import BaseService from '../../base_service'
import { afterVerify } from '../common/events';
class AuthenWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.service = new BaseService();
  }

  async componentDidMount() {
    // Check authen
    var token = localStorage.getItem('token');
    if (!token) {
      window.location.assign("/login");
    } else {
      try {
        var res = await (await this.service.get('authen/verify')).json();
        if (res.success) {
          localStorage.setItem('permissions', JSON.stringify(res.data.permissions));
          localStorage.setItem('user_info', JSON.stringify(res.data.user));
          afterVerify.trigger();
        } else {
          window.location.assign("/login");
        }
      } catch (error) {
        window.location.assign("/login");
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
