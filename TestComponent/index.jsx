import React from 'react';
import styles from './index.style.scss';
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

export function TestComponent({ id, name }) {

  return (
    <div>
    </div>
  );
}

TestComponent.PropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string
}


const TestComponentStyled = CSSModules(TestComponent, styles, {
  allowMultiple: true
}); 