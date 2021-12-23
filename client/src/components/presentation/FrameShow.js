import React from 'react';
import FrameType from '../../common/enumeration/FrameType';
import webconfig from '../../webconfig';
class FrameShow extends React.Component {
  renderFrame() {
    var frame = this.props.frame;
    switch (frame.frame_type_id) {
      case FrameType.Image:
        return (
          <img className="frame_content" src={`${webconfig.serverAddress}${frame.media_url}`} alt="" />
        )
      case FrameType.Video:
        return (
          <video className="frame_content" src={`${webconfig.serverAddress}${frame.media_url}`} width="100%" height="auto" autoPlay muted loop />
        )
      default:
        break;
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="frame-show">
        {
          this.renderFrame()
        }
      </div>
    )
  }
}

export default FrameShow;