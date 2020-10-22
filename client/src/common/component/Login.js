import React from 'react';
import $ from 'jquery';
import BaseService from '../../services/BaseService';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.service = new BaseService();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  componentDidMount() {
    var me = this;
    $('#inputEmail').focus();
    $('#inputEmail, #inputPassword').keydown(function(event) {
      if (event.type === 'keydown' && event.keyCode === 13) {
        me.onSubmit(event);
      }
    })
  }
  

  async onSubmit(event) {
    var email = $(this.emailInput.current).val();
    var password = $(this.passwordInput.current).val();
    var data = {
      email: email,
      password: password
    }
    try {
      var res = await (await this.service.post('authen/login', data)).json();
      if (res.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user);
        window.location.assign("/list-audit-form");
      } else {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
      }
    } catch (error) {
      alert('Có lỗi xảy ra!')
    }


  }

  render() {
    return (
      <div className='login'>
        <div className='container'>
          <div className="card card-container">
            <div className='form-signin'>
              <input ref={this.emailInput} type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
              <input ref={this.passwordInput} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
              <div id="remember" className="checkbox">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button onClick={this.onSubmit.bind(this)} className="btn btn-lg btn-primary btn-block btn-signin">Sign in</button>
            </div>
            <a href="abc" className="forgot-password">
              Forgot the password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
