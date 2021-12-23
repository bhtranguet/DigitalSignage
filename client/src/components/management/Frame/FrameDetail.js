import React from 'react';
import BaseDetail from "../../../common/component/BaseDetail";
import ConfirmDialog from '../../../common/component/ConfirmDialog';
import FieldType from '../../../common/enumeration/FieldType';
import Module from '../../../common/enumeration/Module';
import PanelService from '../../../services/PanelService';
import MediaService from '../../../services/MediaService';


class FrameDetail extends BaseDetail {
  constructor(props) {
    super(Module.Frame, props);
    this.formFields = [
      { fieldName: 'name', fieldType: FieldType.Text },
      { fieldName: 'frame_type_id', fieldType: FieldType.Number },
      { fieldName: 'media_id', fieldType: FieldType.Number },
      { fieldName: 'time_show', fieldType: FieldType.Number },
      { fieldName: 'panel_id', fieldType: FieldType.Number }
    ];
    this.state = {
      name: '',
      frame_type_id: '',
      media_id: '',
      time_show: '',
      panel_id: '',
      listFrameType: [],
      listPanel: [],
      listMedia: []
    }
  }

  async componentDidMount() {
    var panelService = new PanelService();
    var panelRes = await (await panelService.getListEntity()).json();
    if (panelRes.success) {
      this.setState({ listPanel: panelRes.data });
    }

    var mediaService = new MediaService();
    var mediaRes = await (await mediaService.getListEntity()).json();
    if (mediaRes.success) {
      this.setState({ listMedia: mediaRes.data });
    }

    var frameTypeRes = await (await this.service.getListFrameType()).json();
    if (frameTypeRes.success) {
      this.setState({ listFrameType: frameTypeRes.data });
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
            <label>Tên Frame</label>
            <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} name='name' className="form-control" />
          </div>
          <div className="form-group">
            <label>Media</label>
            <select value={this.state.media_id} onChange={this.handleChange.bind(this)} className="form-control" name='media_id'>
              <option value="" disabled={true}>--</option>
              {
                this.state.listMedia.map(item => {
                  return <option key={item.id} value={item.id}>{item.file_name}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Thời gian hiển thị</label>
            <input type="text" value={this.state.time_show} onChange={this.handleChange.bind(this)} name='time_show' className="form-control" />
          </div>
          <div className="form-group">
            <label>Loại Frame</label>
            <select value={this.state.frame_type_id} onChange={this.handleChange.bind(this)} className="form-control" name='frame_type_id'>
              <option value=""  disabled={true}>--</option>
              {
                this.state.listFrameType.map(item => {
                  return <option key={item.id} value={item.id}>{item.name}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Panel</label>
            <select value={this.state.panel_id} onChange={this.handleChange.bind(this)} className="form-control" name='panel_id'>
              <option value=""  disabled={true}>--</option>
              {
                this.state.listPanel.map(item => {
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

export default FrameDetail;