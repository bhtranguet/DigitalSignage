import BaseComponent from './BaseComponent';
import $ from 'jquery';
import FormMode from '../enumeration/FormMode';
import React from 'react';
import Alert from '../ultis/Alert';

class BaseList extends BaseComponent {
  constructor(module) {
    super(module);
    this.gridCfg = {};
    this.title = `Danh sách ${module.moduleText}`;
    this.confirmDialogDelete = React.createRef();
  }

  componentDidMount() {
    $('.top-bar-menu').click(function (e) {
      var menuContent = $('.top-bar-menu-content');
      if (menuContent.hasClass('show')) {
        menuContent.removeClass('show')
      } else {
        menuContent.addClass('show');
      }
    })

    /**
     * Click document
     * Created by: bhtrang
     * 01/11/2020
    */
    $(document).click(function (e) {
      // check click ngoài topbarmenu thì ẩn nội dung đi
      var topBarMenu = $(".top-bar-menu");
      if (!topBarMenu.is(e.target) && topBarMenu.has(e.target).length === 0) {
        $('.top-bar-menu-content').removeClass('show');
      }
    })
  }

  /**
   * Navigate tới màn hình detail
   * Created by: bhtrang
   * 01/11/2020
  */
  navigateDetail(formMode) {
    switch (formMode) {
      case FormMode.Add:
        this.props.history.push(`/management/${this.module.moduleCode}/detail`, { entityID: null });
        break;
      case FormMode.Update:
        var entityID = this.gridCfg.gridEl.current.state.selectedID;
        this.props.history.push(`/management/${this.module.moduleCode}/detail`, { entityID: entityID });
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
    var entityID = this.gridCfg.gridEl.current.state.selectedID;
    var res = await (await this.service.deleteEntity(entityID)).json();
    if (res.success) {
      this.gridCfg.gridEl.current.loadData();
      this.closeConfirmDialog();
      Alert.success('Xóa thành công!');
    }
  }

  closeConfirmDialog() {
    this.confirmDialogDelete.current.setState({open: false});
  }

  openConfirmDialog() {
    this.confirmDialogDelete.current.setState({open: true});
  }
}


export default BaseList;