import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { warningMessageState, responseStatus} from '../atoms/Atoms.js';
import {validateData} from '../utils/formfunction.js'

function Add(){

    const [warningMessage, setWarningMessage] = useRecoilState(warningMessageState)
    const [response, setResponse] = useRecoilState(responseStatus)
    let message = useRecoilValue(warningMessageState)
    let responseMessage = useRecoilValue(responseStatus)
    let messages = []

    function handleChange(e) {
        const name = e.target.name
        const length = e.target.value.length
        const value =e.target.value
        messages = validateData(name, length, value)
        setWarningMessage(messages)
    }

    async function handleSubmit(e) {
        setResponse('')
        e.preventDefault()
        const data = new FormData(e.target)
        const firstName = data.get('firstName') || null
        const lastName = data.get('lastName') || null
        const dateOfBirth = data.get('dateOfBirth') || null
        const privatePhone = data.get('privatePhone') || null
        const workPhone = data.get('workPhone') || null
        const email = data.get('email') || null
        const uid = data.get('uid')  || null

    
        const driver = {
            "first_name": firstName,
            "last_name": lastName,
            "uid": uid,
            "date_of_birth": dateOfBirth,
            "private_phone": privatePhone,
            "work_phone": workPhone,
            "email_address": email,
            "status_id": 0
        }
        
        let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/drivers'
        } else {
          url = process.env.REACT_APP_PRD_API_URL + 'drivers'
        }
        document.querySelector('#addform').reset()
        await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driver)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.affectedRows === 1){
                    setResponse(`The number of affected rows were ${result.affectedRows}`)
                } else {
                    setResponse(result.sqlMessage)
                }
            })
        }

    return(
        <div className = 'add hidden'>
            <h3>Add new driver to database</h3>
        <form onSubmit = {handleSubmit} id = 'addform'>
            <div>
            <label htmlFor = 'firstName hidden'>First name:</label>
            <input 
            type = 'text' 
            id = 'firstName' 
            name = 'firstName' 
            placeholder = '*'
            onChange = {handleChange} />
            </div>
            <div>
            <label htmlFor = 'lastName'>Last name:</label>
            <input 
            type = 'text' 
            id = 'lastName' 
            name = 'lastName' 
            onChange = {handleChange} 
            placeholder = '*'
            />
            </div>
            <div>
            <label htmlFor = 'uid'>UID:</label>
            <input 
            type = 'text' 
            id = 'uid' 
            name = 'uid' 
            onChange = {handleChange} 
            placeholder = '*'
            />
            </div>
            <div>
            <label htmlFor = 'dateOfBirth hidden'>Date of birth:</label>
            <input 
            type = 'date' 
            id = 'dateOfBirth' 
            name = 'dateOfBirth' 
            onChange = {handleChange}
            />
            </div>
            <div>
            <label htmlFor = 'privatePhone hidden'>Phone number(private):</label>
            <input 
            type = 'tel' 
            id = 'privatePhone' 
            name = 'privatePhone' 
            onChange = {handleChange} 
            />
            </div>
            <div>
            <label htmlFor = 'workPhone'>Phone number(work):</label>
            <input 
            type = 'tel' 
            id = 'workPhone' 
            name = 'workPhone' 
            onChange = {handleChange}
            placeholder = '*' 
            />
            </div>
            <div>
            <label htmlFor = 'email'>E-mail:</label>
            <input 
            type = 'email' 
            id = 'email' 
            name = 'email' 
            onChange = {handleChange} 
            placeholder = '*'
            />
            </div>
            <button type="submit" className="btn btn-outline-info">Add driver</button>
            {message ? <p className = 'warning'>{message}</p> : null}
            {responseMessage ? <p>{responseMessage}</p> : null}
        </form>
        </div>
    )
}

export default Add
