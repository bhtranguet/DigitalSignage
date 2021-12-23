import React from 'react';
import '../../styles/ConfirmDialog.scss';
class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  closeDialog() {
    this.setState({open: false});
  }
  render() {
    var openClass = this.state.open ? 'open' : '';
    return (
      <div className={`dialog-wap ${openClass}`}>
        <div className="dialog">
          <div className="dialog-header">
            <div className="dialog-title">{this.props.title}</div>
            <i className="fas fa-times close" onClick={this.closeDialog.bind(this)}></i>
          </div>
          <div className="dialog-body">{this.props.message}</div>
          <div className="dialog-action">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmDialog;