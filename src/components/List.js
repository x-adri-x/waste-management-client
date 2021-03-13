import React from 'react'
import {driversState} from '../atoms/Atoms.js'
import {useRecoilValue} from 'recoil'

function List () {

        let list = useRecoilValue(driversState)
        return(
            <div className = 'list hidden'>
                <h3>List of drivers</h3>
                {list.map(obj => {
                    return(
                        <div style = {{borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, padding: '2vh', width: 'fit-content', marginBottom: '2vh'}}>
                        {Object.entries(obj).map(([key, val]) => 
                            <p key={key} style = {{textAlign: 'left'}}>{key} : {val}</p>
                        )}
                    </div>
                    )  
                })}
            </div>
        )
}

export default List
