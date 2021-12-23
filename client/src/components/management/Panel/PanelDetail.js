import React from 'react';
import BaseDetail from "../../../common/component/BaseDetail";
import ConfirmDialog from '../../../common/component/ConfirmDialog';
import Grid from '../../../common/component/Grid';
import FieldType from '../../../common/enumeration/FieldType';
import FormMode from '../../../common/enumeration/FormMode';
import Module from '../../../common/enumeration/Module';
import Alert from '../../../common/ultis/Alert';
import CanvasService from '../../../services/CanvasService';
import webconfig from '../../../webconfig';

class PanelDetail extends BaseDetail {
  constructor(props) {
    super(Module.Panel, props);
    this.formFields = [
      { fieldName: 'name', fieldType: FieldType.Text },
      { fieldName: 'width', fieldType: FieldType.Number },
      { fieldName: 'height', fieldType: FieldType.Number },
      { fieldName: 'top', fieldType: FieldType.Number },
      { fieldName: 'left', fieldType: FieldType.Number },
      { fieldName: 'canvas_id', fieldType: FieldType.Text }
    ];
    this.state = {
      name: '',
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      canvas_id: '',
      listCanvas: []
    }
    this.gridFrameCfg = {
      gridEl: React.createRef(),
      gridCols: [
        {
          title: 'STT',
          dataType: 'stt',
          width: 70
        },
        {
          data: "name",
          title: 'Tên frame',
          dataType: 'text'
        },
        {
          data: "frame_type",
          title: 'Loại Frame',
          dataType: 'text'
        },
        {
          data: "media_name",
          title: 'Media',
          dataType: 'text'
        },
        {
          data: "time_show",
          title: 'Thời gian hiển thị',
          dataType: 'text'
        },
        {
          data: "panel_name",
          title: 'Panel',
          dataType: 'text'
        },
        {
          data: "canvas_name",
          title: 'Canvas',
          dataType: 'text'
        }
      ],
      gridUrl: `${webconfig.serverAddress}/api/panel/getFrames?panel_id=${this.entityID}`
    }
    this.confirmDialogDelete = React.createRef();
  }

  async componentDidMount() {
    var canvasService = new CanvasService();
    var canvasRes = await (await canvasService.getListEntity()).json();
    if (canvasRes.success) {
      this.setState({ listCanvas: canvasRes.data });
    }
    super.componentDidMount();
  }

  navigateDetail(formMode) {
    switch (formMode) {
      case FormMode.Add:
        this.props.history.push(`/management/frame/detail`, { entityID: null });
        break;
      case FormMode.Update:
        var entityID = this.gridFrameCfg.gridEl.current.state.selectedID;
        this.props.history.push(`/management/frame/detail`, { entityID: entityID });
        break;
      default:
        break;
    }
  }

  async delete() {
    var entityID = this.gridFrameCfg.gridEl.current.state.selectedID;
    var res = await (await this.service.deleteEntity(entityID)).json();
    if (res.success) {
      this.gridFrameCfg.gridEl.current.loadData();
      this.closeConfirmDialog();
      Alert.success('Xóa thành công!');
    }
  }

  openDeleteDialog() {
    this.confirmDialogDelete.current.setState({ open: true });
  }

  closeDeleteDialog() {
    this.confirmDialogDelete.current.setState({ open: false });
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
            <label>Tên panel</label>
            <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} name='name' className="form-control" />
          </div>
          <div className="form-group">
            <label>Chiều rộng</label>
            <input type="number" value={this.state.width} onChange={this.handleChange.bind(this)} name='width' className="form-control" />
          </div>
          <div className="form-group">
            <label>Chiều dài</label>
            <input type="number" value={this.state.height} onChange={this.handleChange.bind(this)} name='height' className="form-control" />
          </div>
          <div className="form-group">
            <label>Cách trên</label>
            <input type="number" value={this.state.top} onChange={this.handleChange.bind(this)} name='top' className="form-control" />
          </div>
          <div className="form-group">
            <label>Cách trái</label>
            <input type="number" value={this.state.left} onChange={this.handleChange.bind(this)} name='left' className="form-control" />
          </div>
          <div className="form-group">
            <label>Canvas</label>
            <select value={this.state.canvas_id} onChange={this.handleChange.bind(this)} className="form-control" name='canvas_id'>
              <option value="" disabled={true} >--</option>
              {
                this.state.listCanvas.map(item => {
                  return <option key={item.id} value={item.id}>{item.name}</option>
                })
              }
            </select>
          </div>
        </form>
        <div className="grid-detail list-panel">
          <div className="grid-title">Danh sách frame</div>
          <div className="grid-action">
            <div className="grid-action-item" onClick={e => { this.navigateDetail(FormMode.Add) }}>Thêm</div>
            <div className="grid-action-item" onClick={e => { this.navigateDetail(FormMode.Update) }}>Sửa</div>
            <div className="grid-action-item" onClick={this.openDeleteDialog.bind(this)}>Xóa</div>
          </div>
          <Grid ref={this.gridFrameCfg.gridEl} url={this.gridFrameCfg.gridUrl} columns={this.gridFrameCfg.gridCols}></Grid>
        </div>
        <ConfirmDialog ref={this.confirmDialog} title="Cảnh báo" message="Bạn có chắc chắn muốn lưu không?">
          <button type='button' className='btn btn-primary' onClick={this.save.bind(this)}>Lưu</button>
          <button type='button' className='btn btn-secondary' onClick={this.closeConfirmDialog.bind(this)}>Đóng</button>
        </ConfirmDialog>
      </div>
    )
  }
}

export default PanelDetail;