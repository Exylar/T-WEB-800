import React from "react";
import * as PT from "prop-types";


const Button = ({children, className, style, onClick, color}) => {

  const borderColor = color === "primary"   ? "border border-blue-600 rounded p-2 text-blue-600 bg-white cursor-pointer" :
                      color === "secondary" ? "p-2 text-blue-600 cursor-pointer" :
                      color === "success"   ? "border border-green-400 rounded p-2 text-green-600 bg-white cursor-pointer" :
                      color === "warning"   ? "border border-yellow-400 rounded p-2 text-yellow-400 bg-white cursor-pointer" :
                      color === "danger"    ? "border border-red-500 rounded p-2 text-red-500 bg-white cursor-pointer" :
                      color === "light"     ? "border border-gray-100 rounded p-2 text-gray-100 bg-white cursor-pointer" :
                      color === "dark"      ? "border border-black rounded p-2 text-red-300 bg-white cursor-pointer" : "";
  return (
    <span className={`${borderColor} ${className}`} style={{...style}} onClick={onClick}>
      {children}
    </span>
  )
}

Button.defaultProps = {
  color: "primary",
  style: {},
  className: ""
}

Button.propTypes = {
  className: PT.string,
  style: {},
  color: PT.oneOf(["primary", "secondary", "success", "warning", "danger", "light", "dark"]),
}

export default Button;