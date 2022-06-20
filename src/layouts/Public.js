import React from "react";

const Public = ({ children }) => {

  return (
    <div style={{ minHeight: "calc(100vh - 128px)" }}>
      {children}
    </div>
  )
}

export default Public;