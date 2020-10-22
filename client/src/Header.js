import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className='App-header'>
        <div className="left">
          <div className="logo"></div>
          <div className="menu d-flex">
            <Link to='/management/screen'>Screen</Link>
            <Link to='/management/canvas'>Canvas</Link>
          </div>
        </div>
        <div className="right"></div>

      </header>
    )
  }
}

export default Header;