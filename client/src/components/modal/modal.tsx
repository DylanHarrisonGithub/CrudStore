import React, { Children } from 'react';

export type ModalProps = {
  children: React.ReactNode[] | React.ReactElement<any, any> | null
}

export const ModalContext = React.createContext<{
  toast: null | ((status: "alert" | "error" | "info" | "success" | "warning", text: string) => void)
}>({
  toast: null
}); 

const Modal: React.FC<ModalProps> = (props: ModalProps) => {

  const [toasts, setToasts] = React.useState<{
    id: number
    status: "alert" | "error" | "info" | "success" | "warning", 
    text: string,
    timeout: ReturnType<typeof setTimeout>
  }[]>([]);

  const toast = (status: "alert" | "error" | "info" | "success" | "warning", text: string) => {
    let t = {
      id: Math.random(), status: status, text: text
    };
    setToasts(prevToasts => [ ... prevToasts, { ... t, ...{ timeout: setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(tst => tst.id !== t.id))
    }, 5000)}}]);
  };

  const dismissToast = (id: number) => setToasts(prevToasts => prevToasts.filter(tst => tst.id !== id));

  const toastSVG = (stat: "alert" | "error" | "info" | "success" | "warning"): string => {
    switch(stat) {
      case 'alert':
        return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
      case 'error':
        return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
      case 'info':
        return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
      case 'success':
        return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
      case 'warning':
        return "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";
    }
  }

  return (
    <div className="p-0 m-0">
      <ModalContext.Provider value={{toast: toast}}>
        {
          props.children
        }
      </ModalContext.Provider>
      <div className="fixed bottom-0 container p-4 z-50">

        {
          toasts.map((t, i) => (
            <div className={`alert alert-${t.status} shadow-lg p-1 my-2 hover:cursor-pointer`} key={i} onClick={() => dismissToast(t.id)}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d={toastSVG(t.status)} 
                /></svg>
                <span>{t.text}</span>
              </div>
            </div>            
          ))
        }

      </div>
    </div>
  )
}

export default Modal;