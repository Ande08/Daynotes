import React,{useState} from 'react';
import Radio from '@mui/material/Radio';
import './style.css'

function RadiuButton( {selectedValue,handleChange}) {

  return (
    <div className='RadiuOptions'>

        <div>

            <Radio
                checked={selectedValue == 'all'}
                onChange={e =>handleChange(e.target)}
                value="all"
            
            />
            <span>Todos</span>

        </div>
        
        <div>
            <Radio
                checked={selectedValue == 'true'}
                onChange={e =>handleChange(e.target)}
                value="true"
            />
            <span>Prioridade</span>

        </div>
      
    
    
    </div>
  );
}

export default RadiuButton;