import React from 'react'
import AlertContext from '../context/Alert/AlertContext'
import { useContext } from 'react'


function Alert(props) {
    const context=useContext(AlertContext);
    const {alert,alertState}=context;
    return (
        <div>
            <div className={`alert  alert-${alertState}`} role="alert">
                {alert}
            </div>
        </div>
    )
}


export default Alert

