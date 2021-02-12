import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {uuid} from 'uuidv4'

function Add(){

    function handleSubmit(e) {
        const data = new FormData(e.target)
        const firstName = data.get('firstName')
        const lastName = data.get('lastName')
        const dateOfBirth = data.get('dateOfBirth')
        const privatePhone = data.get('privatePhone')
        const workPhone = data.get('workPhone')
        const email = data.get('email')
        const address = data.get('address')
        const id = uuid()
        const driver = {
            "first_name": firstName,
            "last_name": lastName,
            "date_of_birth": dateOfBirth,
            "driver_id": id,
            "private_phone": privatePhone,
            "work_phone": workPhone,
            "email_address": email,
            "address": address
        }
        //fetch('api/drivers', {
        fetch('https://waste-management-admin.herokuapp.com/drivers', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(driver)
            })
            .then(response => console.log(response.json()))
    }

    return(
        <form className = 'add hidden' onSubmit = {handleSubmit}>
            <label htmlFor = 'firstName'>First name:</label>
            <input type = 'text' id = 'firstName' name = 'firstName'></input>
            <label htmlFor = 'lastName'>Last name:</label>
            <input type = 'text' id = 'lastName' name = 'lastName'></input>
            <label htmlFor = 'dateOfBirth'>Date of birth:</label>
            <input type = 'date' id = 'dateOfBirth' name = 'dateOfBirth'></input>
            <label htmlFor = 'privatePhone'>Phone number(private):</label>
            <input type = 'tel' id = 'privatePhone' name = 'privatePhone'></input>
            <label htmlFor = 'workPhone'>Phone number(work):</label>
            <input type = 'tel' id = 'workPhone' name = 'workPhone'></input>
            <label htmlFor = 'email'>E-mail:</label>
            <input type = 'email' id = 'email' name = 'email'></input>
            <label htmlFor = 'address'>Address:</label>
            <input type = 'text' id = 'address' name = 'address'></input>
            <button type="submit" className="btn btn-outline-info">Add driver</button>
        </form>
    )
}

export default Add