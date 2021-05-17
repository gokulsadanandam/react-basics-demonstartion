import React from 'react';
import Button from 'react-bootstrap/Button';

export default function(props) {
  return (
    <>
      {props.link && (
        <Button
          size={props.size}
          variant={props.variant}
          className="rounded-circle m-2 d-flex align-items-center justify-content-center"
          style={{ width: 50, height: 50 }}
          href={props.link}
          target="_blank"
        >
          {props.icon}
        </Button>
      )}
    </>
  );
}
