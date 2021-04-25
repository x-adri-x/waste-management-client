import React from 'react'
import {listState, uidState} from '../atoms/Atoms.js'
import {useRecoilValue, useSetRecoilState} from 'recoil'

function List () {

        let list = useRecoilValue(listState)
        let setUid = useSetRecoilState(uidState)
        const grabUserId = (e) => {
            let user_id = ''
            e.target.nodeName !== 'DIV' ? (user_id = e.target.parentNode.getAttribute('id')) : (user_id = e.target.getAttribute('id'))
            navigator.clipboard.writeText(user_id).then(() => {console.log('Successfully copied.')}, () => {console.log('Copy failed.')})
            navigator.clipboard.readText().then(text => setUid(text))
        }
        return(
            <div className = 'list hidden'>
                <h3>List of drivers</h3>
                {list.length > 0 ? 
                list.map((obj, index) => {
                    return(
                        <div key = {index} className = 'list-item-box' id = {obj['User ID']} onClick = {grabUserId}>
                        {Object.entries(obj).map(([key, val]) => 
                            key !== 'User ID' ? <p key={key} style = {{textAlign: 'left'}}><span className = 'bold'>{key} : </span>{val}</p> : null
                        )}
                        </div>
                    )  
                }) : <p>There is nothing to show.</p>}
            </div>
        )
}

export default List
