import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const ExpenseCategory = (props) => {
  const {
    color,
    icon,
    title,
    active,
    onClick,
    className,
  } = props;

  return (
    <div className={`py-2 px-5 border-black rounded flex flex-col items-center justify-center bg-gray-200 cursor-pointer ${active ? "border-2" : ""}`}
         onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {title}
    </div>
  ) 
}

export default ExpenseCategory;