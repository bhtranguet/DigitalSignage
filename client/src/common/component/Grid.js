import React from 'react';
import '../styles/grid.scss';
import $ from 'jquery';
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      url: '',
      groupBy: props.groupBy ? props.groupBy : '',
      selected: -1
    }
  }

  executeEvent(event) {
    var target = $(event.currentTarget);
    // Xử lý xự kiện tương tác vs grid row
    if (target.hasClass('grid-row')) {
      switch (event.type) {
        case 'click':
          // lấy id entity và đổi lại trạng thái
          this.state.data.forEach(entity => {
            entity['isSelected'] = false;
          });
          var entityID = parseInt(target.attr('id'));
          var entity = this.state.data.find(entity => entity.id === entityID);
          entity['isSelected'] = true;
          this.setState({ data: this.state.data, selected: entity.id })

          // gọi function executeCustomEvent ở lớp cha
          if (this.props.executeCustomEvent) {
            this.props.executeCustomEvent('row-click', this, entity);
          }
          break;
        default:
          break;
      }
    }
  }

  async componentDidMount() {
    this.props.columns.forEach(column => {
      if (column['dataType'] === undefined) {
        column['dataType'] = 'text';
      }
      switch (column['dataType']) {
        case 'text':
          if (column['width'] === undefined) {
            column['width'] = 200;
          }
          break;
        case 'number':
          if (column['width'] === undefined) {
            column['width'] = 150;
          }
          break;
        default:
          break;
      }
    });

    this.setState({
      columns: this.props.columns
    });

    // Lấy dữ liệu data
    this.loadData();
  }

  async loadData(query = '') {
    // Lấy dữ liệu data
    var url = '';
    if (query.length > 0) {
      url = this.props.url + query;
    } else {
      url = this.props.url
    }

    try {
      var data = await (await fetch(url)).json();
      if (data.success) {
        if (data.data.length > 0) {
          data.data[0]['isSelected'] = true;
        }
        this.setState({
          data: data.data, selected: data.data.length > 0 ? data.data[0].id : -1
        });
        if (this.props.afterLoad) {
          if (data.data.length > 0) {
            this.props.afterLoad(data.data[0].id, data.data);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    var gridHeight = this.props.height ? this.props.height + 'px' : '100%';
    return (
      <div className='grid' style={{ height: `${gridHeight}` }}>
        <GridHeader columns={this.state.columns}></GridHeader>
        <GridContent columns={this.state.columns} data={this.state.data} executeEvent={this.executeEvent.bind(this)} groupBy={this.state.groupBy}></GridContent>
      </div>
    );
  }
}

function GridHeader(props) {
  var headerItems = props.columns.map((item, index) => {
    return (
      <div key={index} className='header-item' style={{ minWidth: `${item.width}px` }}>
        {item.title}
      </div>
    )
  })
  return (
    <div className='grid-header'>
      {headerItems}
    </div>
  )
}

function GridContent(props) {
  var groups = [];
  var data = props.data;
  // Trường hợp có group by
  if (props.groupBy.length > 0 && props.data.length > 0) {
    // Lấy ra các nhóm
    props.data.forEach((row, index) => {
      var group = {
        isGroup: true
      };
      if (index === 0 || groups.every(item => item[props.groupBy] !== row[props.groupBy])) {
        group[props.groupBy] = row[props.groupBy];
        groups.push(group);
      }
    });

    // thêm sum các column dạng number
    groups.forEach(group => {
      var groupName = group[props.groupBy];
      var columnNumbers = props.columns.filter(item => item.dataType === 'number');
      var dataFilter = data.filter(item => item[props.groupBy] === groupName);
      columnNumbers.forEach(c => {
        group[c.data] = dataFilter.reduce((a, b) => {
          var currentValue = b[c.data] === -1 || b[c.data] === null ? 0 : b[c.data];
          return a + currentValue;
        }, 0);
      });
    })

    // Thêm các group vào data grid
    data = groups.concat(props.data);

    // Sort các lại data sắp xếp bị trí của row group
    data.sort(function (a, b) {
      if (a[props.groupBy] > b[props.groupBy]) {
        return 1;
      } else if (a[props.groupBy] < b[props.groupBy]) {
        return -1;
      } else {
        return 0;
      }
    });
  }



  // Render các row
  var rows = data.map((row, index) => {
    if (row["isGroup"]) {
      var cellGroups = props.columns.map((column, indexCol) => {
        var cellContent = indexCol === 0 ? row[props.groupBy] : row[column.data];

        return (
          <div key={indexCol} className='grid-cell' style={{ minWidth: `${column.width}px`, maxWidth: `${column.width}px` }}>{cellContent}</div>
        )
      })
      var disableClass = row.disable ? 'disable' : '';
      return (
        <div id={row.id} key={index} className={`grid-row grid-row-group ${disableClass}`}>
          {cellGroups}
        </div>
      )
    }

    // Cell của row
    var cells = props.columns.map((column, indexCol) => {
      var cellContent = "";
      if (column.dataType === 'stt') {
        cellContent = index + 1;
      } else {
        cellContent = column.render ? column.render(column, row[column.data], row) : <div className='text' title={row[column.data]}>{row[column.data]}</div>;
      }
      return (
        <div key={indexCol} className={'grid-cell'} style={{ minWidth: `${column.width}px`, maxWidth: `${column.width}px` }}>{cellContent}</div>
      )
    })
    // return 1 row
    var selected = row.isSelected ? 'selected' : '';
    var disableRowClass = row.disable ? 'row-disable' : '';
    return (
      <div id={row.id} key={index} className={`grid-row ${selected} ${disableRowClass}`} onClick={event => props.executeEvent(event)} onDoubleClick={event => props.executeEvent(event)}>{cells}</div>
    )
  })


  return (
    <div className='grid-content'>
      {rows}
    </div>
  )
}

export default Grid;
