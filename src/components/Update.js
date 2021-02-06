import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {searchState} from './Atoms.js'
import { useRecoilState, useRecoilValue } from 'recoil';
import SmallResult from './SmallResult.js'

function Update () { 

    const [search, setSearch] = useRecoilState(searchState)
    const data = useRecoilValue(searchState)

    async function getDriver(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const first_name = data.get('firstName')
        const last_name = data.get('lastName')
        //let url = `api/drivers/search/first_name/${first_name}/last_name/${last_name}`
        let url = `https://waste-management-admin.herokuapp.com/api/drivers/search/first_name/${first_name}/last_name/${last_name}`
        const result = await fetch(url).then(r => r.json()).catch(e => console.log(e))
        setSearch(result)
        document.querySelector('#searchForm').reset()
    }

   
        return(
            <div className = 'update hidden'>
                <div>
                <h3>Search driver</h3>
                <form onSubmit = {getDriver} id = 'searchForm'>
                    <label htmlFor = 'firstName'>First name:</label>
                    <input type = 'text' id = 'firstName' name = 'firstName'></input>
                    <label htmlFor = 'lastName'>Last name:</label>
                    <input type = 'text' id = 'lastName' name = 'lastName'></input>
                    <button type="submit" className="btn btn-outline-info">Search driver</button>
                </form>
                {data.length > 0 ? <SmallResult /> : null}
            </div>
                <form>
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
                    <button type="submit" className="btn btn-outline-info">Update driver</button>
                </form>
            </div>
        )
}

export default Update