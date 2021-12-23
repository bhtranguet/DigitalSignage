import React from "react";
import BaseList from "../../../common/component/BaseList";
import ConfirmDialog from "../../../common/component/ConfirmDialog";
import Grid from "../../../common/component/Grid";
import FormMode from "../../../common/enumeration/FormMode";
import Module from "../../../common/enumeration/Module";
import '../../../styles/ScreenList.scss';
import webconfig from "../../../webconfig";

class FrameList extends BaseList {
  constructor(props) {
    super(Module.Frame);
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
      gridUrl: `${webconfig.serverAddress}/api/frame`
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

export default FrameList;