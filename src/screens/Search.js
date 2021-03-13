import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from '../components/Result.js'
import {searchState, warningMessageState, responseStatus} from '../atoms/Atoms.js'
import { useRecoilState, useRecoilValue } from 'recoil';
import { generateFetchUrl } from '../utils/generateFetchUrl.js';


function Search () { 
    const [search, setSearch] = useRecoilState(searchState)
    const [warningMessage, setWarningMessage] = useRecoilState(warningMessageState)
    const [response, setResponse] = useRecoilState(responseStatus)
    let warning = useRecoilValue(warningMessageState)
    let messages = []

    const onSubmit = async(e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const first_name = data.get('firstName') || null
        const last_name = data.get('lastName') || null
        
        let url = generateFetchUrl('drivers/search')

        let searchParams = {
            "first_name": first_name,
            "last_name": last_name
        }
        
        await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchParams)
            })
            .then(response => response.json())
            .then(result => {
                setSearch(result)
                if(result.affectedRows === 1){
                    setResponse(`The number of affected rows were ${result.affectedRows}`)
                } else {
                    setResponse(result.sqlMessage)
                }
            })
        
        document.querySelector('#searchForm').reset()
        setWarningMessage([])
        }

    const message = async() => {
        const message = {
            to: "ExponentPushToken[i9Yi9pJpzCwwxzq3rXi_LJ]",
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!'
          };
        
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Accept': 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
          })
    }

    function validateForm() {
        if(messages.length > 0){
            return true
        } else {return false}
    }

    const handleChange = (e) => {
        setWarningMessage([])
        const name = e.target.name
        const length = e.target.value.length
        const value =e.target.value
        let msg = ''
        console.log('im in handleChange beginning: '+warning)
        if(name === 'firstName' || name === 'lastName'){
            if(value.match(/\d+/g) != null){
                msg = 'Name contains numbers.'
                messages.push(msg)
            }
            if(length < 2){
                msg = 'First name and last name should at least be 2 characters long.'
                messages.push(msg)
            }
        }
        setWarningMessage(messages)
    }
        
        return(
            <div className = 'search hidden'>
                <button onClick = {message}>Message</button>
                <h3>Search driver</h3>
                <form onSubmit = {onSubmit} id = 'searchForm'>
                    <div>
                        <label htmlFor = 'firstName'>First name:</label>
                        <input 
                        type = 'text' 
                        id = 'firstName' 
                        name = 'firstName' 
                        onChange = {handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor = 'lastName'>Last name:</label>
                        <input 
                        type = 'text' 
                        id = 'lastName' 
                        name = 'lastName'
                        onChange = {handleChange} 
                        />
                    </div>
                    {validateForm ? <p className = 'warning'>{warning}</p> : null }
                    <button type="submit" className="btn btn-outline-info">Search driver</button>
                </form>
                <Result />
            </div>
        )
    }

export default Search
