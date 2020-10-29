import React from "react";
import Grid from "../../../common/component/Grid";

class ScreenList extends React.Component {
  constructor(props) {
    super();
    this.gridEl = React.createRef();
    this.gridCfg = {
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
        }
      ],
      gridUrl: `http://localhost:8000/api/screen`
    }
  }
  render() {
    return (
      <div>
        <Grid ref={this.gridEl} url={this.gridCfg.gridUrl} columns={this.gridCfg.gridCols}></Grid>
      </div>
    )
  }
}

export default ScreenList;