import React, { useState } from "react";
import { AiTwotoneDelete, AiOutlineExclamationCircle } from "react-icons/ai";
import api from "../../service/api";

import './style.css'
import './style-priority.css'

function Notes({data, handleDelete, handleChangePriority}){

    const [ChangedNote, setChangedNote] = useState('');


    function handleEdit(e, priority){
        e.style.cursor = 'text';
        e.style.borderRadius = '5px';

        if(priority){
            e.style.boxShadow = '0 0 5px white'
        }else{
            e.style.boxShadow = '0 0 5px gray'
        }
    }
    async function handleSave(e,note){

        e.style.cursor = 'default';
        e.style.boxShadow = 'none';

        if(ChangedNote && ChangedNote != note){
            await api.post(`/content/${data._id}`,{
                note: ChangedNote,
            })
        }
    }

    

    return(
        <>
        
        <li className={data.priority ? "notepadInfos-priority" : "notepadInfos"}>
                <div>
                  <div>
                  <strong>{data.title}</strong>
                  </div>
                   
                  <div className='elimina'>
                      <AiTwotoneDelete 
                      size="30"
                      onClick={()=> handleDelete(data._id)}
                      />
                  </div> 
                  
                  <textarea 
                  defaultValue={data.note}
                  onClick={e =>handleEdit(e.target, data.priority)}
                  onChange={e => setChangedNote(e.target.value)}
                  onBlur={ e => handleSave(e.target, data.note)}
                  />

                  

                  <span>
                    <AiOutlineExclamationCircle 
                    size="30"
                    onClick={()=> handleChangePriority(data._id)}
                    
                    />
                  </span>
                </div>
            </li>
        
        </>
    )
}

export default Notes;