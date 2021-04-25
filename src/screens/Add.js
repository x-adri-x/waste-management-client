import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {warningMessageState, responseStatus} from '../atoms/Atoms.js';
import {validateData} from '../utils/formfunction.js'
import {generateUrl, validateSQLResult} from '../utils/retrieving_data.js'

function Add(){

    const [warningMessage, setWarningMessage] = useRecoilState(warningMessageState)
    const setResponse = useSetRecoilState(responseStatus)
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
        const password = data.get('password')  || null

        try {
            const regex_pw = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}/
            const regex_email = /[a-zA-Z0-9]+@.+\.[a-z]+/
            if(password.length < 8){
                alert("Please use at least 8 characters.")
                return
            }
            if(!password.match(regex_pw)) {
                alert("Password must have uppercase letters and numbers in it.")
                return
            }
            if(!email.match(regex_email)) {
                alert("Email must not contain special characters.")
                return
            }

            const payload = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_DRIVERS_FIREBASE_KEY}`  
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }).then(response => response.json()).then(result => {
                if(result?.error?.message === 'EMAIL_EXISTS'){
                    alert('An account with this email address already exists.')
                }
                
                if(result?.localId){
                    const driver = {
                        "first_name": firstName,
                        "last_name": lastName,
                        "uid": result?.localId,
                        "date_of_birth": dateOfBirth,
                        "private_phone": privatePhone,
                        "work_phone": workPhone,
                        "email_address": email,
                        "status_id": 0
                    }
                    saveUserToDatabase(driver)
                }
            }) 
        } catch (e) {
            console.log('An error occured: ' + e.toString())
        }
    }

        async function saveUserToDatabase(driver){
            let url = generateUrl('drivers')
            document.querySelector('#addform').reset()
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(driver)
                })
                .then(response => response.json())
                .then(result => {
                    setResponse(validateSQLResult(result))
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
            <div>
            <label htmlFor = 'uid'>Password:</label>
            <input 
            type = 'password' 
            id = 'password' 
            name = 'password' 
            onChange = {handleChange}
            placeholder = '*'
            />
            </div>
            </div>
            <button type="submit" className="btn btn-outline-info">Add driver</button>
            {warningMessage ? <p className = 'warning'>{warningMessage}</p> : null}
            {responseMessage ? <p>{responseMessage}</p> : null}
        </form>
        </div>
    )
}

export default Add
