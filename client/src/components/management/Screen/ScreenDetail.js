import React from 'react';
import BaseDetail from "../../../common/component/BaseDetail";
import ConfirmDialog from '../../../common/component/ConfirmDialog';
import FieldType from '../../../common/enumeration/FieldType';
import Module from '../../../common/enumeration/Module';
import CanvasService from '../../../services/CanvasService';

class ScreenDetail extends BaseDetail {
  constructor(props) {
    super(Module.Screen, props);
    this.formFields = [
      { fieldName: 'name', fieldType: FieldType.Text },
      { fieldName: 'password', fieldType: FieldType.Text },
      { fieldName: 'canvas_id', fieldType: FieldType.Text },
    ];
    this.state = {
      name: '',
      password: '',
      canvas_id: '',
      listCanvas: []
    }
  }

  async componentDidMount() {
    var canvasService = new CanvasService();
    var canvasRes = await (await canvasService.getListEntity()).json();
    if (canvasRes.success) {
      this.setState({ listCanvas: canvasRes.data });
    }
    super.componentDidMount();
  }

  render() {
    return (
      <div className="detail-page">
        <h2>{this.title}</h2>
        <div className="detail-top-bar">
          <button type='button' className="btn btn-light" onClick={this.back.bind(this)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <button type='button' className="btn btn-primary" onClick={this.openConfirmDialog.bind(this)}>Lưu</button>
        </div>
        <form name='detail-form'>
          <div className="form-group">
            <label>Tên màn hình</label>
            <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} name='name' className="form-control" />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" value={this.state.password} onChange={this.handleChange.bind(this)} name='password' className="form-control" />
          </div>
          <div className="form-group">
            <label>Canvas</label>
            <select value={this.state.canvas_id} onChange={this.handleChange.bind(this)} className="form-control" name='canvas_id'>
              {
                this.state.listCanvas.map(item => {
                  return <option key={item.id} value={item.id}>{item.name}</option>
                })
              }
            </select>
          </div>
        </form>
        <ConfirmDialog ref={this.confirmDialog} title="Cảnh báo" message="Bạn có chắc chắn muốn lưu không?">
          <button type='button' className='btn btn-primary' onClick={this.save.bind(this)}>Lưu</button>
          <button type='button' className='btn btn-secondary' onClick={this.closeConfirmDialog.bind(this)}>Đóng</button>
        </ConfirmDialog>
      </div>
    )
  }
}

export default ScreenDetail;