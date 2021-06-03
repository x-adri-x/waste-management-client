import React from 'react'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {idState, listState, uidState} from '../atoms/Atoms.js'
import { toggleHidden } from '../utils/toggleHidden.js'

function Result () {
    let results = useRecoilValue(listState)
    const setKey = useSetRecoilState(idState)
    const setUid = useSetRecoilState(uidState)

    const grabID = (e) => {
        let uid = ''
        if(e.target.nodeName === 'DIV'){
            uid = e.target.getAttribute('spec')
        } else if(e.target.nodeName === 'SPAN'){
            uid = e.target.parentNode.parentNode.getAttribute('spec')
        } else {
            uid = e.target.parentNode.getAttribute('spec')
        }
        let id = document.querySelector('.list-item-box').firstElementChild.textContent
        id = id.split(': ')[1]
        setKey(id)
        setUid(uid)
        console.log(uid)
        toggleHidden('textbox')
    }
    
    return (
        <div style = {{marginTop: '2vh'}} className = 'result hidden'>
            <h3>Results</h3>
            {results.length > 0 ? 
            results.map((obj, index) => {
                return(
                    <div key = {index} className = 'list-item-box' onClick = {(e) => grabID(e)} spec = {obj['uid']}>
                        {Object.entries(obj).map(([key, val]) => 
                            (key !== 'uid' && key !== 'agent' && key !== 'addressID') ? <p key={key} style = {{textAlign: 'left'}}><span className = 'bold'>{key} : </span>{val}</p> : null
                        )}
                    </div>
                    )  
            }) : <p>There is nothing to show.</p>}
        </div>
    )  
} 

export default Result
