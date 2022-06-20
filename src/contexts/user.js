import {createContext, useState, useContext} from 'react';

const Context = createContext();

const Default = {
  user: null,
  loading: true
}

const Provider = ({children}) => {
  const [ctx, setCtx] = useState({...Default});

  return (
    <Context.Provider value={[ctx, setCtx]}>
      {children}
    </Context.Provider>
  )
}

const useUser = () => useContext(Context);

export default useUser;
export {Provider};