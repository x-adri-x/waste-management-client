import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {responseStatus, uidState, warningMessageState} from '../atoms/Atoms.js'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {validateData} from '../utils/formfunction.js'
import { generateUrl, validateSQLResult } from '../utils/retrieving_data.js';

function Update () { 
    const setResponse = useSetRecoilState(responseStatus)
    const [warningMessage, setWarningMessage] = useRecoilState(warningMessageState)
    const uid = useRecoilValue(uidState)
    
    let messages = []

    function handleChange (e) {
        const name = e.target.name
        const length = e.target.value.length
        const value =e.target.value
        messages = validateData(name, length, value)
        setWarningMessage(messages)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const fields = ['first_name', 'last_name', 'uid', 'date_of_birth', 'private_phone', 'work_phone', 'email_address']
        let body = {}

        fields.map(field =>  {
            data.get(field) !== '' && (body[field] = data.get(field))
        })
        
        let url = generateUrl('drivers/update/uid/')
        url += `${body.uid}`
        document.querySelector('#updateform').reset()
        console.log(body)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setWarningMessage(validateSQLResult(result))
            })
    }
   
        return(
            <div className = 'update hidden'>
                <h3>Update driver information</h3>
                <form onSubmit = {handleSubmit} id = 'updateform'>
                    <div>
                        <label htmlFor = 'first_name'>First name:</label>
                        <input 
                        type = 'text'
                        name = 'first_name' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'last_name'>Last name:</label>
                        <input 
                        type = 'text'  
                        name = 'last_name' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'uid'>UID:</label>
                        <input 
                        type = 'text' 
                        name = 'uid'
                        placeholder = '*'
                        value = {uid}
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'date_of_birth'>Date of birth:</label>
                        <input 
                        type = 'date'  
                        name = 'date_of_birth' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'private_phone'>Phone number(private):</label>
                        <input 
                        type = 'tel'  
                        name = 'private_phone' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'work_phone'>Phone number(work):</label>
                        <input 
                        type = 'tel' 
                        name = 'work_phone' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'email'>E-mail:</label>
                        <input 
                        type = 'email' 
                        name = 'email_address' 
                        onChange = {handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-info">Update driver</button>
                    {warningMessage ? <p className = 'warning'>{warningMessage}</p> : null}
                </form>
            </div>
        )
}

export default Update
