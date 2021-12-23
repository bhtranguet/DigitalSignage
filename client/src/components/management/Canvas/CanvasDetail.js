import React from 'react';
import BaseDetail from "../../../common/component/BaseDetail";
import ConfirmDialog from '../../../common/component/ConfirmDialog';
import Grid from '../../../common/component/Grid';
import FieldType from '../../../common/enumeration/FieldType';
import Module from '../../../common/enumeration/Module';
import webconfig from '../../../webconfig';
import '../../../styles/CanvasDetail.scss';
import $ from 'jquery';
import Utility from '../../../common/ultis/Ultility';
import FormMode from '../../../common/enumeration/FormMode';
import Alert from '../../../common/ultis/Alert';

class CanvasDetail extends BaseDetail {
  constructor(props) {
    super(Module.Canvas, props);
    this.formFields = [
      { fieldName: 'name', fieldType: FieldType.Text },
      { fieldName: 'width', fieldType: FieldType.Number },
      { fieldName: 'height', fieldType: FieldType.Number },
      { fieldName: 'top', fieldType: FieldType.Number },
      { fieldName: 'left', fieldType: FieldType.Number },
    ];
    this.state = {
      name: '',
      width: '',
      height: '',
      top: '',
      left: '',
      listPanel: [],
      loadComplete: false
    }
    this.gridPanelCfg = {
      gridEl: React.createRef(),
      gridCols: [
        {
          title: 'STT',
          dataType: 'stt',
          width: 70
        },
        {
          data: "name",
          title: 'Tên Panel',
          dataType: 'text'
        },
        {
          data: "width",
          title: 'Chiều rộng',
          dataType: 'number'
        },
        {
          data: "height",
          title: 'Chiều dài',
          dataType: 'number'
        },
        {
          data: "top",
          title: 'Cách trên',
          dataType: 'number'
        },
        {
          data: "left",
          title: 'Cách trái',
          dataType: 'number'
        },
      ],
      gridUrl: `${webconfig.serverAddress}/api/canvas/getPanels?id=${this.entityID}`
    }
    this.confirmDialogDelete = React.createRef();
  }

  async componentDidMount() {
    super.componentDidMount();
  }

  afterLoadForm() {
    var canvasBox = $('.canvas-box');
    var canvasWidth = canvasBox.width();
    var canvasHeight = (parseFloat(this.state.height) / parseFloat(this.state.width)) * canvasWidth;
    canvasBox.height(canvasHeight);
    this.setState({ loadComplete: true })
  }

  afterLoadGridPanel(selectedID, data) {
    this.setState({ listPanel: data });
  }

  getPanelStyles(panel) {
    var canvasBox = $('.canvas-box');
    var canvasWidth = canvasBox.width();
    var canvasHeight = canvasWidth * (parseFloat(this.state.height) / parseFloat(this.state.width));
    var panelWidth = 0;
    var panelHeight = 0;
    var panelTop = 0;
    var panelLeft = 0;
    if (!Utility.isNullOrEmpty(this.state.width)) {
      panelWidth = canvasWidth * (parseFloat(panel.width) / parseFloat(this.state.width));
      panelLeft = canvasWidth * (parseFloat(panel.left) / parseFloat(this.state.width));
    }
    if (!Utility.isNullOrEmpty(this.state.height)) {
      panelHeight = canvasHeight * (parseFloat(panel.height) / parseFloat(this.state.height));
      panelTop = canvasHeight * (parseFloat(panel.top) / parseFloat(this.state.height));
    }
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return {
      position: 'absolute',
      width: panelWidth,
      height: panelHeight,
      top: panelTop,
      left: panelLeft,
      background: `#${randomColor}`
    }
  }

  /**
   * Navigate tới màn hình detail
   * Created by: bhtrang
   * 01/11/2020
  */
  navigateDetail(formMode) {
    switch (formMode) {
      case FormMode.Add:
        this.props.history.push(`/management/panel/detail`, { entityID: null });
        break;
      case FormMode.Update:
        var entityID = this.gridPanelCfg.gridEl.current.state.selectedID;
        this.props.history.push(`/management/panel/detail`, { entityID: entityID });
        break;
      default:
        break;
    }
  }

  /**
   * Xóa record
   * Created by: bhtrang
   * 06/11/2020
  */
  async delete() {
    var entityID = this.gridPanelCfg.gridEl.current.state.selectedID;
    var res = await (await this.service.deleteEntity(entityID)).json();
    if (res.success) {
      this.gridPanelCfg.gridEl.current.loadData();
      this.closeConfirmDialog();
      Alert.success('Xóa thành công!');
    }
  }

  openDeleteDialog() {
    this.confirmDialogDelete.current.setState({open: true});
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
          <button type='button' className="btn btn-primary" onClick={this.openConfirmDialog.bind(this)}>Áp dụng</button>
        </div>
        <div className="canvas-detail-main">
          <form name='detail-form' className="detail-form">
            <div className="form-group">
              <label>Tên canvas</label>
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
          </form>
          <div className="canvas-live-view">
            <div className="canvas-box">
              {
                this.state.listPanel.map(panel => {
                  var panelStyles = this.getPanelStyles(panel);
                  return (
                    <div className="panel-box" key={panel.id} style={panelStyles}>{panel.name}</div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="grid-detail list-panel">
          <div className="grid-title">Danh sách panel</div>
          <div className="grid-action">
            <div className="grid-action-item" onClick={e => { this.navigateDetail(FormMode.Add) }}>Thêm</div>
            <div className="grid-action-item" onClick={e => { this.navigateDetail(FormMode.Update) }}>Sửa</div>
            <div className="grid-action-item" onClick={this.openDeleteDialog.bind(this)}>Xóa</div>
          </div>
          <Grid ref={this.gridPanelCfg.gridEl} url={this.gridPanelCfg.gridUrl} columns={this.gridPanelCfg.gridCols} afterLoad={this.afterLoadGridPanel.bind(this)}></Grid>
        </div>
        <ConfirmDialog ref={this.confirmDialog} title="Cảnh báo" message="Bạn có chắc chắn muốn lưu không?">
          <button type='button' className='btn btn-primary' onClick={this.save.bind(this)}>Lưu</button>
          <button type='button' className='btn btn-secondary' onClick={this.closeConfirmDialog.bind(this)}>Đóng</button>
        </ConfirmDialog>
        <ConfirmDialog ref={this.confirmDialogDelete} title="Cảnh báo" message="Bạn có chắc chắn muốn xóa không?">
          <button type='button' className='btn btn-danger' onClick={this.delete.bind(this)}>Xóa</button>
          <button type='button' className='btn btn-secondary' onClick={this.closeDeleteDialog.bind(this)}>Đóng</button>
        </ConfirmDialog>
      </div>
    )
  }
}

export default CanvasDetail;