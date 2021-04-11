import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from '../components/Result.js'
import {listState, warningMessageState, responseStatus} from '../atoms/Atoms.js'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { generateUrl } from '../utils/retrieving_data.js';
import {validateSQLResult} from '../utils/retrieving_data.js'
import {formatDriver} from '../utils/formatting.js'
import { toggleHidden } from '../utils/toggleHidden.js';

function Search () { 
    const setList = useSetRecoilState(listState)
    const [warningMessage, setWarningMessage] = useRecoilState(warningMessageState)
    const setResponse = useSetRecoilState(responseStatus)
    let messages = []

    const onSubmit = async(e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const first_name = data.get('firstName') || null
        const last_name = data.get('lastName') || null
        
        let url = generateUrl('drivers/search')

        let searchParams = {
            "first_name": first_name,
            "last_name": last_name
        }
        
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchParams)
            })
            .then(response => response.json())
            .then(result => {
                const formatted_list = formatDriver(result)
                setList(formatted_list)
                setResponse(validateSQLResult(result))
                toggleHidden('result')
            })
        
        document.querySelector('#searchForm').reset()
        setWarningMessage([])
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
        console.log('im in handleChange beginning: '+ warningMessage)
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
                    {validateForm ? <p className = 'warning'>{warningMessage}</p> : null }
                    <button type="submit" className="btn btn-outline-info">Search driver</button>
                </form>
                <Result />
            </div>
        )
    }

export default Search
