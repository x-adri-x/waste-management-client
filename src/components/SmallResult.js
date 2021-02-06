import React from 'react'
import {useRecoilValue} from 'recoil'
import {searchState} from './Atoms.js'

function SmallResult () {
    let results = useRecoilValue(searchState)
    
    if(results.length > 0) {
        return (
            <div>
                {(results).map(obj => {
                    return(
                        <div style = {{borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, borderRadius: '2vw', padding: '2vh', width: '15vw'}}>
                        <p>First name: {obj['first_name']}</p>
                        <p>Last name: {obj['last_name']}</p>
                        <p>Date of birth: {obj['date_of_birth']}</p>
                    </div>
                    )  
                })}
            </div>
        ) 
    } else {
        return null
    }
    
}

export default SmallResult