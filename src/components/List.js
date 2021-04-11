import React from 'react'
import {listState} from '../atoms/Atoms.js'
import {useRecoilValue} from 'recoil'

function List () {

        let list = useRecoilValue(listState)
        return(
            <div className = 'list hidden'>
                <h3>List of drivers</h3>
                {list.map((obj, index) => {
                    return(
                        <div key = {index} className = 'list-item-box' id = {obj['User ID']}>
                        {Object.entries(obj).map(([key, val]) => 
                            key !== 'User ID' ? <p key={key} style = {{textAlign: 'left'}}><span className = 'bold'>{key} : </span>{val}</p> : null
                        )}
                    </div>
                    )  
                })}
            </div>
        )
}

export default List
