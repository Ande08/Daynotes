import { useState, useEffect } from 'react'
import './Style/global.css'
import './Style/sidebar.css'
import './Style/App.css'
import './Style/main.css'
import Notes from './components/Notes/notes'
import api from './service/api'
import RadiuButton from './components/RadiuButton/radiubutton'


function App() {
  
  const [selectedValue, setSelectedValue] = useState('all');
  const [ title,  setTitles ]= useState('');
  const [note, setNote ] = useState('');
  const [AllNotes, setAllNotes ] = useState(['']);
  
  useEffect(()=>{

    getAllNotes()
    
  },[])
  
  async function getAllNotes(){
    const response = await api.get('/anotetions')

    setAllNotes(response.data);
  }

  async function loadNotes(option){

    const params = {priority : option};
    const response = await api.get('/priorities',{params})

    if(response){
      setAllNotes(response.data)
    }

  }

 function handleChange(e){
  setSelectedValue(e.value)

  if(e.checked && e.value =='all'){
    getAllNotes()
  }else{
    
    loadNotes(e.value)
  }
 }


  useEffect(()=>{
    function ennableSubmitButton(){
      let btn = document.getElementById('btn-submit')

      btn.style.backgroundColor ='#ffd3ca';
      if(title && note){
        btn.style.backgroundColor ="#e88f7a"
      }
    }

    ennableSubmitButton();
  },[title , note])
  
  async function handleSubmit(e){

    e.preventDefault();

    const response = await api.post('/anotetions' , {
      title,
      note,
      priority:false
    }) 

    setNote('');
    setTitles('');
    setAllNotes([... AllNotes , response.data]);
  }

  async function handleDelete(id){
    const deletedNote = await api.delete(`/anotetions/${id}`)

    if (deletedNote) {
      setAllNotes(AllNotes.filter(note=> note._id != id))
    }
  }

  async function handleChangePriority(id){

    const note = await api.post(`/priorities/${id}`)
    if(note && selectedValue == 'all'){
      getAllNotes();
    }else if(note){
      loadNotes(selectedValue);
    }

  }


  return(
    <div id="app">

      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>

          <div className="input-block">
            <label htmlFor="title"> Titulo da anotação </label>
            <input

             required 
             maxLength={30}
             value={title}
             onChange={e => setTitles( e.target.value )}
             
             />
          </div>

          <div className="input-block">
            <label htmlFor="">Nota</label>
            <textarea 
              required 
              value = {note} 
              onChange={ e => setNote( e.target.value )}
            />
          </div>

          <button id='btn-submit' type="submit">Salvar</button>

        </form>
        <RadiuButton
          selectedValue ={selectedValue}
          handleChange = {handleChange}
        
        />

      </aside>

      <main>

          <ul>
            {AllNotes.map(data =>(

              <Notes 
              key ={data._id}
              data={data}
              handleDelete={handleDelete}
              handleChangePriority={handleChangePriority}
              />
            ))}
          </ul>

      </main>
    </div>
  );
  
}

export default App
