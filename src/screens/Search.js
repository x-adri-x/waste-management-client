import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from '../components/Result.js'
import {searchState} from '../atoms/Atoms.js'
import { useRecoilState } from 'recoil';


function Search () { 
    const [search, setSearch] = useRecoilState(searchState)

    const getDriver = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const first_name = data.get('firstName')
        const last_name = data.get('lastName')
        let url = `api/drivers/search/first_name/${first_name}/last_name/${last_name}`
        const result = await fetch(url).then(r => r.json()).catch(e => console.log(e))
        console.log(result)
        setSearch(result)
        document.querySelector('#searchForm').reset()
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
            body: JSON.stringify(message),
          })

        // const timestamp = new Date().toLocaleString()
        // const message = {
        //     'message': e.target.innerHTML,
        //     'user_id': 18,
        //     'timestamp': timestamp
        // }
        // fetch('api/notifications', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(message)
        // })
        // .then(response => console.log(response.json()))
        //subscribeUser()
    }
        
        return(
            <div className = 'search hidden'>
                <button onClick = {message}>Message</button>
                <h3>Search driver</h3>
                <form onSubmit = {getDriver} id = 'searchForm'>
                    <label htmlFor = 'firstName'>First name:</label>
                    <input type = 'text' id = 'firstName' name = 'firstName'></input>
                    <label htmlFor = 'lastName'>Last name:</label>
                    <input type = 'text' id = 'lastName' name = 'lastName'></input>
                    <button type="submit" className="btn btn-outline-info">Search driver</button>
                </form>
                <Result />
            </div>
        )
    }

export default Search
