import React from "react";
import BaseList from "../../../common/component/BaseList";
import ConfirmDialog from "../../../common/component/ConfirmDialog";
import Grid from "../../../common/component/Grid";
import FormMode from "../../../common/enumeration/FormMode";
import Module from "../../../common/enumeration/Module";
import '../../../styles/CanvasList.scss';
import webconfig from "../../../webconfig";

class CanvasList extends BaseList {
  constructor(props) {
    super(Module.Canvas);
    this.gridCfg = {
      gridEl: React.createRef(),
      gridCols: [
        {
          title: 'STT',
          dataType: 'stt',
          width: 70
        },
        {
          data: "name",
          title: 'Tên màn hình',
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
      gridUrl: `${webconfig.serverAddress}/api/canvas`
    }
  }

  
  render() {
    return (
      <div className='list-page list-screen'>
        <h2>{this.title}</h2>
        <div className="list-top-bar">
          <button type="button" className="btn btn-primary top-bar-item" onClick={ e => {this.navigateDetail(FormMode.Add) }}>Thêm</button>
          <button type="button" className="btn btn-light top-bar-item top-bar-menu">
            <i className="fas fa-ellipsis-h"></i>
            <div className='top-bar-menu-content'>
              <div className="top-bar-menu-item" onClick={e => {this.navigateDetail(FormMode.Update)}}>Sửa</div>
              <div className="top-bar-menu-item" onClick={this.openConfirmDialog.bind(this)}>Xóa</div>
            </div>
          </button>
        </div>
        <Grid ref={this.gridCfg.gridEl} url={this.gridCfg.gridUrl} columns={this.gridCfg.gridCols}></Grid>
        <ConfirmDialog ref={this.confirmDialogDelete} title="Cảnh báo" message="Bạn có chắc chắn muốn xóa không?">
          <button type='button' className='btn btn-danger' onClick={this.delete.bind(this)}>Xóa</button>
          <button type='button' className='btn btn-secondary' onClick={this.closeConfirmDialog.bind(this)}>Đóng</button>
        </ConfirmDialog>
      </div>
    )
  }
}

export default CanvasList;