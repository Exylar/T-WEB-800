import React, {useState, useEffect, createContext, useContext} from "react";

const Context = createContext();

const Default = {

}

const Provider = ({children}) => {
  const [ctx, setCtx] = useState({...Default});

  return (
    <Context.Provider value={[ctx, setCtx]}>
      {children}
    </Context.Provider>
  )
}

const useMap = () => useContext(Context);

export default useMap;
export {Provider};