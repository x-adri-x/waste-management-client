import React from 'react'
import {useRecoilValue} from 'recoil'
import {searchState} from '../atoms/Atoms.js'

function Result () {
    let results = useRecoilValue(searchState)
    
    if(results.length > 0) {
        return (
            <div style = {{marginTop: '2vh'}} className = 'result'>
                <h3>Results</h3>
                {(results).map((obj, index) => {
                    return(
                        <div key = {index} className = 'list-item-box'>
                        {Object.entries(obj).map(([key, val]) => 
                            <p key={key} style = {{textAlign: 'left'}}><span className = 'bold'>{key} : </span>{val}</p>
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
