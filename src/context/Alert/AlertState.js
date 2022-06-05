import AlertContext from "./AlertContext"
import { useState } from "react";

const AlertState=(props)=> {
    const [alert,setAlert]=useState("");
    const [alertState,setAlertState]=useState("dismissible");


    const handleAlert=(message,type)=>{
        setAlert(message);
        setAlertState(type);
        setTimeout(()=>{
            setAlert("");
            setAlertState("dismissible");
        },3000);
    }

  return (
        <AlertContext.Provider value={{alert,alertState,handleAlert}}>
            {props.children}
        </AlertContext.Provider> 
  )
}

export default AlertState
