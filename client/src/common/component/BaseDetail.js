import FormMode from '../enumeration/FormMode';
import BaseComponent from './BaseComponent';
import $ from 'jquery';
import FieldType from '../enumeration/FieldType';
import React from 'react';
import Alert from '../ultis/Alert';
import Utility from '../ultis/Ultility';
class BaseDetail extends BaseComponent {
  constructor(module, props) {
    super(module);
    // Các property của màn hình detail
    this.title = '';
    this.formFields = [];
    this.formMode = null;
    this.entityID = null;
    this.originData = {};
    this.confirmDialog = React.createRef();

    // Gán các giá trị cho property tùy theo form mode
    if (props.location.state.entityID === null) {
      this.title = `Thêm ${this.module.moduleText}`;
      this.formMode = FormMode.Add;
      this.entityID = null;
    } else {
      this.title = `Sửa ${this.module.moduleText}`;
      this.formMode = FormMode.Update;
      this.entityID = props.location.state.entityID;
    }

  }

  afterLoadForm() {};

  async componentDidMount() {
    // Load data entity khi Update
    if (this.formMode === FormMode.Update) {
      var res = await (await this.service.getEntityByID(this.entityID)).json();
      if (res.success) {
        this.loadFormUpdate(res.data);
        this.afterLoadForm();
      }
    }
  }

  /**
   * Load dữ liệu cho các input khi update
   * Created by: bhtrang
   * 02/11/2020
  */
  loadFormUpdate(data) {
    this.originData = data;
    this.formFields.forEach(field => {
      if (Utility.isNullOrEmpty(data[field.fieldName])) {
        switch (field.fieldType) {
          case FieldType.Text:
            data[field.fieldName] = '';
            break;
          case FieldType.Number:
            data[field.fieldName] = 0;
            break;
          default:
            break;
        }
      }
      this.setState({ [field.fieldName]: data[field.fieldName] });
    })
  }

  /**
   * Cập nhật state khi input thay đổi
   * Created by: bhtrang
   * 01/11/2020
  */
  handleChange(e) {
    var target = $(e.currentTarget);
    var fieldName = target.attr('name');
    var fieldValue = target.val();
    this.setState({ [fieldName]: fieldValue });
  }

  /**
   * Hàm back
   * Created by: bhtrang
   * 01/11/2020
  */
  back() {
    this.props.history.goBack();
  }

  /**
   * Thực hiện Add or Update
   * Created by: bhtrang
   * 01/11/2020
  */
  save() {
    switch (this.formMode) {
      case FormMode.Add:
        this.add();
        break;
      case FormMode.Update:
        this.update();
        break;
      default:
        break;
    }
  }

  openConfirmDialog() {
    this.confirmDialog.current.setState({open: true});
  }

  closeConfirmDialog() {
    this.confirmDialog.current.setState({open: false});
  }

  /**
   * Thêm một entity
   * Created by: bhtrang
   * 01/11/2020
  */
  async add() {
    var currentData = this.getCurrentData();
    var dataSave = this.prepareDataAdd(currentData);
    var res = await (await this.service.insertEntity(dataSave)).json();
    if (res.success) {
      this.closeConfirmDialog();
      Alert.success('Thêm thành công!');
    } else {
      this.closeConfirmDialog();
      Alert.error('Có lỗi xảy ra!');
    }
  }

  /**
   * Update một entity
   * Created by: bhtrang
   * 01/11/2020
  */
  async update() {
    debugger
    var currentData = this.getCurrentData();
    var dataSave = {id: this.entityID};
    Object.keys(currentData).forEach(key => {
      // Lấy những fields có thay đổi lưu vào dataSave
      if (currentData[key] !== this.originData[key]) {
        dataSave[key] = currentData[key];
      }
    });
    var res = await (await this.service.updateEntity(dataSave)).json();
    if (res.success) {
      this.closeConfirmDialog();
      Alert.success('Cập nhật thành công!');
    } else {
      this.closeConfirmDialog();
      Alert.error('Có lỗi xảy ra!');
    }
  }

  /**
   * Lấy giá trị hiện tại của form
   * Created by: bhtrang
   * 01/11/2020
  */
  getCurrentData() {
    var currentData = {};
    this.formFields.forEach(field => {
      switch (field.fieldType) {
        case FieldType.Text:
          currentData[field.fieldName] = this.state[field.fieldName];
          break;
        case FieldType.Number:
          currentData[field.fieldName] = parseInt(this.state[field.fieldName]);
          break;
        default:
          currentData[field.fieldName] = this.state[field.fieldName];
          break;
      }
    })
    return currentData;
  }

  /**
   * Format lại dữ liệu trước khi thêm
   * Created by: bhtrang
   * 01/11/2020
  */
  prepareDataAdd(currentData) {
    return currentData;
  }

  /**
   * Format lại dữ liệu trước khi update
   * Created by: bhtrang
   * 01/11/2020
  */
  prepareDataUpdate(currentData) {
    currentData.id = this.entityID;
    return currentData;
  }
}

export default BaseDetail;