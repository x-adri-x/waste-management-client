import React from 'react'
import {useRecoilValue} from 'recoil'
import {searchState} from '../atoms/Atoms.js'

function Result () {
    let results = useRecoilValue(searchState)
    
    if(results.length > 0) {
        return (
            <div style = {{marginTop: '2vh'}} className = 'result'>
                <h3>Results</h3>
                {(results).map(obj => {
                    return(
                        <div style = {{borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, padding: '2vh', width: 'fit-content'}}>
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
