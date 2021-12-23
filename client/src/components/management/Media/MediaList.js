import React from "react";
import BaseList from "../../../common/component/BaseList";
import ConfirmDialog from "../../../common/component/ConfirmDialog";
import Grid from "../../../common/component/Grid";
import Module from "../../../common/enumeration/Module";
import '../../../styles/ScreenList.scss';
import webconfig from "../../../webconfig";
import "../../../styles/MediaList.scss";
import $ from 'jquery';
import Alert from "../../../common/ultis/Alert";

class MediaList extends BaseList {
  constructor(props) {
    super(Module.Media);
    this.gridCfg = {
      gridEl: React.createRef(),
      gridCols: [
        {
          title: 'STT',
          dataType: 'stt',
          width: 70
        },
        {
          data: "file_name",
          title: 'Tên file',
          dataType: 'text'
        },
        {
          data: "file_extension",
          title: 'Định dạng',
          dataType: 'text'
        },
        {
          data: "file_path",
          title: 'Đường dẫn',
          dataType: 'text'
        },
      ],
      gridUrl: `${webconfig.serverAddress}/api/media`
    }
  }

  handleClickUpload() {
    $("#input-upload-media").click();
  }

  async handleFilesSelected(e) {
    var files = e.target.files;
    var formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append('images', file);
    }
    var res = await (await this.service.uploadMedia(formData)).json();
    if (res.success) {
      Alert.success('Upload thành công!');
      this.gridCfg.gridEl.current.loadData();
    } else {
      Alert.error("Upload thất bại!");
    }
  }

  render() {
    return (
      <div className='list-page list-media'>
        <h2>{this.title}</h2>
        <div className="list-top-bar">
          <button type="button" className="btn btn-primary top-bar-item" onClick={this.handleClickUpload.bind(this)}>Upload</button>
          <button type="button" className="btn btn-light top-bar-item top-bar-menu">
            <i className="fas fa-ellipsis-h"></i>
            <div className='top-bar-menu-content'>
              <div className="top-bar-menu-item" onClick={this.openConfirmDialog.bind(this)}>Xóa</div>
            </div>
          </button>
        </div>
        <Grid ref={this.gridCfg.gridEl} url={this.gridCfg.gridUrl} columns={this.gridCfg.gridCols}></Grid>
        <input id="input-upload-media" type="file" multiple onChange={this.handleFilesSelected.bind(this)}/>
        <ConfirmDialog ref={this.confirmDialogDelete} title="Cảnh báo" message="Bạn có chắc chắn muốn xóa không?">
          <button type='button' className='btn btn-danger' onClick={this.delete.bind(this)}>Xóa</button>
          <button type='button' className='btn btn-secondary' onClick={this.closeConfirmDialog.bind(this)}>Đóng</button>
        </ConfirmDialog>
      </div>
    )
  }
}

export default MediaList;