import * as React from 'react';
import './link.scss';
export const MarcelLink = (props: { text: string; url: string }) => {
  return (
    <a className="link" href={props.url}>
      <div
        style={{
          width: '36px',
          display: 'flex',
          margin: '0px 7px 0px 9px',
          alignItems: 'center',
        }}
      >
        <a style={{ position: 'relative', background: 'rgb(255, 255, 255)' }}>
          <div
            style={{
              zIndex: 10,
              position: 'absolute',
              transform: 'none',
              left: '0px',
              top: '0px',
              height: '2px',
              width: '18px',
              borderRadius: '1px',
              background: 'rgb(255, 91, 0)',
            }}
          ></div>
          <div
            style={{
              zIndex: 10,
              position: 'absolute',
              transform: 'rotate(45deg)',
              left: '12px',
              top: '-2px',
              height: '2px',
              width: '6px',
              borderRadius: '1px',
              background: 'rgb(255, 91, 0)',
            }}
          ></div>
          <div
            style={{
              zIndex: 10,
              position: 'absolute',
              transform: 'rotate(-45deg)',
              left: '12px',
              top: '2px',
              height: '2px',
              width: '6px',
              borderRadius: '1px',
              background: 'rgb(255, 91, 0)',
            }}
          ></div>
        </a>
      </div>
      {props.text}
    </a>
  );
};
