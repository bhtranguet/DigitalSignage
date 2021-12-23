import BaseComponent from "../../common/component/BaseComponent";
import React from 'react';
import AuthenWrapper from "../../common/component/AuthenWrap";
import Module from "../../common/enumeration/Module";
import Utility from "../../common/ultis/Ultility";
import '../../styles/ScreenShow.scss';
import FrameShow from "./FrameShow";

class ScreenShow extends BaseComponent {
  constructor() {
    super(Module.Presentation);
    this.state = {
      canvas: {},
      listPanel: [],
      listFrame: [],
      listCaption: [],
      listCaptionText: []
    }
  }
  async componentDidMount() {
    var screen = Utility.getItemLocalStorage('screen');
    if (screen && Object.keys(screen).length > 0) {
      var res = await (await this.service.getScreenShowData(screen.id)).json();
      if (res.success) {
        var data = res.data;
        this.setState({
          canvas: data.canvas,
          listPanel: data.listPanel,
          listFrame: data.listFrame,
          listCaption: data.listCaption,
          listCaptionText: data.listCaptionText
        })
      }
    }
    setInterval(() => {
      // Xử lý hiển thị canvas
      if (!Utility.isNullOrEmpty(this.state.canvas)) {
        this.state.listPanel.forEach(panel => {
          var frames = this.state.listFrame.filter(frame => frame.panel_id === panel.id);

          if (frames.length === 0) {
            return;
          }

          if (frames.length === 1) {
            frames[0].active = true;
            this.setState({ listFrame: this.state.listFrame });
            return;
          }

          var activeFrame = frames.find(frame => frame.active === true);
          if (Utility.isNullOrEmpty(activeFrame)) {
            frames[0].active = true;
            frames[0].time_leave = frames[0].time_show;
          } else {
            activeFrame.time_leave = activeFrame.time_leave - 1000;
            if (activeFrame.time_leave <= 0) {
              var indexCurrent = frames.indexOf(activeFrame);
              var indexNext = indexCurrent === frames.length - 1 ? 0 : indexCurrent + 1;
              var nextFrame = frames[indexNext];
              nextFrame.time_leave = nextFrame.time_show;
              nextFrame.active = true;
              activeFrame.active = false;
            }
          }
          this.setState({ listFrame: this.state.listFrame });
        })
      }

      // Xử lý hiển thị caption
      var d = new Date();
      var currentTime = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
      this.state.listCaption.forEach(caption => {
        if (caption.time_start_sec < currentTime && currentTime < caption.time_end_sec) {
          this.state.listCaptionText.forEach(captionText => {
            if (captionText.caption_id === caption.id) {
              captionText.show = true;
            }
          })
        }
      });
      this.setState(this.state.listCaptionText);
    }, 1000);

  }
  render() {
    var canvasStyle = {
      position: 'absolute',
      width: this.state.canvas.width,
      height: this.state.canvas.height,
      top: this.state.canvas.top,
      left: this.state.canvas.left
    }

    var captions = [];
    this.state.listCaptionText.filter(item => item.show === true).forEach(item => {
      captions.push(<span>{item.text}</span>);
    })
    return (
      <AuthenWrapper {...this.props}>
        <div className="screen-show" style={{ position: 'relative' }}>
          <div className="canvas" style={canvasStyle}>
            {
              this.state.listPanel.map(panel => {
                var panelStyle = {
                  position: 'absolute',
                  width: panel.width,
                  height: panel.height,
                  top: panel.top,
                  left: panel.left
                }
                var frames = this.state.listFrame.filter(frame => frame.panel_id === panel.id);
                return (
                  <div key={panel.id} className="panel" style={panelStyle}>
                    {
                      frames.map(frame => {
                        return (
                          <div key={frame.id} className="frame" active={`${frame.active}`} style={{ position: 'absolute', top: 0, left: 0 }}>
                            <FrameShow frame={frame}></FrameShow>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
          <div className="marquee">
            <p style={{animation: `marquee ${captions.length * 10}s linear infinite`}}>{captions}</p>
          </div>
        </div>
      </AuthenWrapper>
    )
  }
}

export default ScreenShow;