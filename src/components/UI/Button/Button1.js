import React from 'react';

import classes from './Button1.module.scss';

export default function Button1({
  buttonWidth = '100%',
  buttonFontSize = '1rem',

  ...props
}) {
  return (
    <button
      style={{
        '--button-width': buttonWidth,
        '--button-font-size': buttonFontSize,
      }}
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
