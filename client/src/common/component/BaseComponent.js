import React from 'react';

class BaseComponent extends React.Component {
  constructor(module) {
    super();
    this.module = module;
    this.service = new (module.service)();
  }
}

export default BaseComponent;