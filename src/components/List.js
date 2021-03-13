import React from 'react'
import {driversState} from '../atoms/Atoms.js'
import {useRecoilValue} from 'recoil'

function List () {

        let list = useRecoilValue(driversState)
        return(
            <div className = 'list hidden'>
                <h3>List of drivers</h3>
                {list.map((obj, index) => {
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
}

export default List
