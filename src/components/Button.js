import React from "react";
import "components/Button.scss";
import classNames from "classnames";

//Rendered in from.js and confirm.js
export default function Button(props) {
  const { confirm, danger, onClick, disabled } = props;
  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
   
    </button>
  );
}