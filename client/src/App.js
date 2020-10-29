import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routerConfig from './common/config/routerConfig'
import './App.scss';
import RouteWithSubRoutes from './common/component/RouteWithSubRoutes';


class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div className='app-content'>
            {
              routerConfig.map(route => {
                return <RouteWithSubRoutes key={route.path} route={route} />
              })
            }
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
