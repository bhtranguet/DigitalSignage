import React from 'react';
import BaseDetail from "../../../common/component/BaseDetail";
import ConfirmDialog from '../../../common/component/ConfirmDialog';
import Grid from '../../../common/component/Grid';
import FieldType from '../../../common/enumeration/FieldType';
import Module from '../../../common/enumeration/Module';
import Alert from '../../../common/ultis/Alert';
import ScreenService from '../../../services/ScreenService';
import webconfig from '../../../webconfig';

class CaptionDetail extends BaseDetail {
  constructor(props) {
    super(Module.Caption, props);
    this.formFields = [
      { fieldName: 'name', fieldType: FieldType.Text },
      { fieldName: 'background', fieldType: FieldType.Text },
      { fieldName: 'time_start', fieldType: FieldType.Text },
      { fieldName: 'time_end', fieldType: FieldType.Text },
      { fieldName: 'screen_id', fieldType: FieldType.Number }
    ];
    this.state = {
      name: '',
      background: '',
      time_start: '',
      time_end: '',
      caption_text: '',
      screen_id: '',
      listScreen: []
    }
    this.gridCaptionTextCfg = {
      gridEl: React.createRef(),
      gridCols: [
        {
          title: 'STT',
          dataType: 'stt',
          width: 70
        },
        {
          data: "text",
          title: 'Text',
          dataType: 'text',
          width: 600
        },
        {
          title: 'Action',
          width: 100,
          render: this.renderAction.bind(this)
        }
      ],
      gridUrl: `${webconfig.serverAddress}/api/caption/getCaptionText?caption_id=${this.entityID}`
    }
    this.confirmDialogDelete = React.createRef();
  }

  async componentDidMount() {
    var screenService = new ScreenService();
    var screenRes = await (await screenService.getListEntity()).json();
    if (screenRes.success) {
      this.setState({ listScreen: screenRes.data });
    }
    super.componentDidMount();
  }

  async deleteCaptionText(id) {
    var res = await (await this.service.deleteCaptionText(id)).json();
    if (res.success) {
      Alert.success('Xóa thành công!');
      this.gridCaptionTextCfg.gridEl.current.loadData();
    } else {
      Alert.error('Có lỗi xẩy ra!')
    }
  }

  renderAction(column, data, row) {
    return <button type='button' className='btn btn-secondary' onClick={e => this.deleteCaptionText(row.id)}>Xóa</button>
  }

  async addCaptionText() {
    var captionText = {
      text: this.state.caption_text,
      caption_id: this.entityID
    }
    var res = await (await this.service.addCaptionText(captionText)).json();
    if (res.success) {
      Alert.success('Thêm thành công!');
      this.gridCaptionTextCfg.gridEl.current.loadData();
    } else {
      Alert.success('Có lỗi xẩy ra!');
    }
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
            <label>Tên caption</label>
            <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} name='name' className="form-control" />
          </div>
          <div className="form-group">
            <label>Màu nền</label>
            <input type="text" value={this.state.background} onChange={this.handleChange.bind(this)} name='background' className="form-control" />
          </div>
          <div className="form-group">
            <label>Thời gian bắt đầu</label>
            <input type="text" value={this.state.time_start} onChange={this.handleChange.bind(this)} name='time_start' className="form-control" />
          </div>
          <div className="form-group">
            <label>Thời gian kết thúc</label>
            <input type="text" value={this.state.time_end} onChange={this.handleChange.bind(this)} name='time_end' className="form-control" />
          </div>
          <div className="form-group">
            <label>Screen</label>
            <select value={this.state.screen_id} onChange={this.handleChange.bind(this)} className="form-control" name='screen_id'>
              <option value="0">-- Chọn Screen</option>
              {
                this.state.listScreen.map(item => {
                  return <option key={item.id} value={item.id}>{item.name}</option>
                })
              }
            </select>
          </div>
        </form>
        <div className="grid-detail list-panel">
          <div className="grid-title">Danh sách Text</div>
          <Grid ref={this.gridCaptionTextCfg.gridEl} url={this.gridCaptionTextCfg.gridUrl} columns={this.gridCaptionTextCfg.gridCols}></Grid>
          <div className="d-flex" style={{ width: 772 }}>
            <input type="text" style={{ marginRight: 16 }} className="form-control" value={this.state.caption_text} onChange={this.handleChange.bind(this)} name='caption_text' />
            <button type='button' className='btn btn-primary' onClick={this.addCaptionText.bind(this)}>Thêm</button>
          </div>
        </div>
        <ConfirmDialog ref={this.confirmDialog} title="Cảnh báo" message="Bạn có chắc chắn muốn lưu không?">
          <button type='button' className='btn btn-primary' onClick={this.save.bind(this)}>Lưu</button>
          <button type='button' className='btn btn-secondary' onClick={this.closeConfirmDialog.bind(this)}>Đóng</button>
        </ConfirmDialog>
      </div>
    )
  }
}

export default CaptionDetail;