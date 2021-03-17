import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {responseStatus, warningMessageState} from '../atoms/Atoms.js'
import {useRecoilValue, useRecoilState} from 'recoil';
import {validateData} from '../utils/formfunction.js'
import { generateUrl, validateSQLResult } from '../utils/retrieving_data.js';

function Update () { 
    const [response, setResponse] = useRecoilState(responseStatus)
    const [warningMessage, setWarningMessage] = useRecoilState(warningMessageState)
    const message = useRecoilValue(warningMessageState)
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
        const fields = ['first_name', 'last_name', 'uid', 'date_of_birth', 'private_phone', 'work_phone', 'email']
        let body = {}

        fields.map(field =>  {
            data.get(field) !== '' && (body[field] = data.get(field))
        })
        
        let url = generateUrl('drivers/update/uid/')
        url = `${body.uid}`
        document.querySelector('#updateform').reset()
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
                setResponse(validateSQLResult(result))
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
                        id = 'first_name' 
                        name = 'first_name' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'last_name'>Last name:</label>
                        <input 
                        type = 'text' 
                        id = 'last_name' 
                        name = 'last_name' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'uid'>UID:</label>
                        <input 
                        type = 'text' 
                        id = 'uid' 
                        name = 'uid'
                        placeholder = '*'
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'date_of_birth'>Date of birth:</label>
                        <input 
                        type = 'date' 
                        id = 'date_of_birth' 
                        name = 'date_of_birth' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'private_phone'>Phone number(private):</label>
                        <input 
                        type = 'tel' 
                        id = 'private_phone' 
                        name = 'private_phone' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'work_phone'>Phone number(work):</label>
                        <input 
                        type = 'tel' 
                        id = 'work_phone' 
                        name = 'work_phone' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'email'>E-mail:</label>
                        <input 
                        type = 'email' 
                        id = 'email' 
                        name = 'email' 
                        onChange = {handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-info">Update driver</button>
                    {message ? <p className = 'warning'>{message}</p> : null}
                </form>
            </div>
        )
}

export default Update
