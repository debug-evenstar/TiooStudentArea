import React, { createContext, FC, useContext, useState } from 'react'

type NoticeContextProps = {
  isNoticeOpen: boolean;
  showNotice: () => void;
  closeNotice: () => void;
}

const NoticeContext = createContext<any>(null);


export function useExamNotice() {

  const context = useContext(NoticeContext)

  return context;
}


interface NoticeProviderProps{
  children : any;
}

export const NoticeProvider: FC<NoticeProviderProps> = ({children}) => {
  const [ isNoticeOpen, setNotice ] = useState(false);

  const showNotice = () => setNotice(true);
  const closeNotice = () => setNotice(false);

  return ( 
  <NoticeContext.Provider value={{isNoticeOpen, showNotice, closeNotice}}>
    {children}
  </NoticeContext.Provider>
  )

}