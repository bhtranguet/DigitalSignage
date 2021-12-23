import React from 'react';
import BaseComponent from '../../common/component/BaseComponent';
import Module from '../../common/enumeration/Module';
import '../../styles/PresentationLogin.scss';
import $ from 'jquery';

class PresentationLogin extends BaseComponent {
  constructor() {
    super(Module.Authen);
    this.state = {
      name: '',
      password: ''
    }
  }

  handleChange(e) {
    var target = $(e.currentTarget);
    var fieldName = target.attr('name');
    var fieldValue = target.val();
    this.setState({ [fieldName]: fieldValue });
  }

  async login(e) {
    var res = await (await this.service.presentationLogin(this.state.name, this.state.password)).json();
    if (res.success) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('screen', JSON.stringify(res.data.screen));
      this.props.history.push('/presentation/screen-show');
    }
  }

  render() {
    return (
      <div className='presentation-login'>
        <div className="login-form">
          <div className="title">Đăng nhập</div>
          <div className="form-group">
            <label>Tên màn hình</label>
            <input value={this.name} onChange={this.handleChange.bind(this)} name='name' type="text" className="screen-name form-control" />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input value={this.password} onChange={this.handleChange.bind(this)} name='password' type="password" className="password form-control" />
          </div>
          <button type="button" className='btn btn-primary' onClick={this.login.bind(this)}>Đăng nhập</button>
        </div>
      </div>
    )
  }
}

export default PresentationLogin;