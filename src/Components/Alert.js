import React from 'react'

const Alert = (props) => {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "Error "
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <>
            <br />
            <div className='justify-content-center align-items-center'>
                <div style={{ height: '50px', width: '10cm', marginLeft: '13cm' }}>
                    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fadeshow `} role='alert'>
                        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Alert
