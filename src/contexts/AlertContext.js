import { useState, createContext } from "react";

//context
const AlertContext = createContext();

//component context
const AlertProvider = ({ children }) => {
  const [alertaMensaje, setAlertaMensaje] = useState(null);
  const [typeAlert, setTypeAlert] = useState("error");
  const [type, setType] = useState(null);

  function closeAlertSms() {
    setAlertaMensaje(null);
  }

  function alertSms(mensaje, typealert, type) {
    setAlertaMensaje(mensaje);
    setTypeAlert(typealert);
    setType(type);
    setTimeout(function () {
      setAlertaMensaje(null);
    }, 7000);
  }

  const data = { alertSms, alertaMensaje, typeAlert, closeAlertSms, type };

  return (
    <>
      <AlertContext.Provider value={data}>{children}</AlertContext.Provider>
    </>
  );
};

export { AlertProvider };
export default AlertContext;
