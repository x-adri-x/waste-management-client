import React from 'react'
import {useRecoilValue, useRecoilState} from 'recoil'
import {idState, searchState} from '../atoms/Atoms.js'

function Result () {
    let results = useRecoilValue(searchState)
    const [key, setKey] = useRecoilState(idState)

    const grabID = () => {
        let id = document.querySelector('.list-item-box').firstElementChild.textContent
        id = id.split(': ')[1]
        setKey(id)
    }
    
    if(results.length > 0) {
        return (
            <div style = {{marginTop: '2vh'}} className = 'result'>
                <h3>Results</h3>
                {(results).map((obj, index) => {
                    return(
                        <div key = {index} className = 'list-item-box' onClick = {grabID}>
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
