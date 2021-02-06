import React from 'react'
import {useRecoilValue} from 'recoil'
import {searchState} from './Atoms.js'

function Result () {
    let results = useRecoilValue(searchState)
    
    if(results.length > 0) {
        return (
            <div>
                {(results).map(obj => {
                    return(
                        <div style = {{borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, borderRadius: '2vw', padding: '2vh', width: '15vw'}}>
                        {Object.entries(obj).map(([key, val]) => 
                            <p key={key} style = {{textAlign: 'left'}}>{key} : {val}</p>
                        )}
                    </div>
                    )  
                })}
            </div>
        ) 
    } else {
        return null
    }
    
}

export default Result