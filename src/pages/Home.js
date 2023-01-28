import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
// it's used to generate the unique id for the new room 
import toast from 'react-hot-toast';
//it's the package it's used for pop up the window, we can customised any where in the page !
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId]= useState('');
    const [username, setUsername]= useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id  =uuidv4();
        setRoomId(id);
        toast.success('Created a new room')

    }
    const joinRoom = () =>{
        if(!roomId || !username){
            toast.error("ROOM ID & username is Required");
            return;
        }
        navigate(`/editor/${roomId}`,{
            state : {
                username,
            },
        })
        //redirect

    }
    const handleInputEnter = (e) =>{
        if(e.code === 'Enter'){
            joinRoom();
        }
    }
  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img src="https://raw.githubusercontent.com/codersgyan/realtime-code-editor/main/public/code-sync.png" 
        className='homePageLogo' alt='code-sync-logo'/>
        <h4 className='mainLable'>Paste invitation ROOM ID</h4>
        <div className='inputGroup'>
            <input 
                type="text" 
                className='inputBox' 
                placeholder='ROOM ID' 
                onChange={(e)=>setRoomId(e.target.value)} 
                value={roomId}
                onKeyUp={handleInputEnter}
            />

            <input 
                type="text" 
                className='inputBox' 
                onChange={(e)=>setUsername(e.target.value)} value={username} 
                placeholder='USERNAME'
                onKeyUp={handleInputEnter}
            />

            <button className='btn joinBtn' onClick={joinRoom}>Join</button>
            <span className='createInfo'> 
            if you don't have an invite then create &nbsp; 
            <a onClick={createNewRoom} href='' className='createNewBtn'>new room</a>
            </span>
        </div>
      </div>
      <footer>
        <h4>Built with 💙 by <a href='https://github.com/Anilreddy2000' target="_blank">Coder's anilreddy</a></h4>
      </footer>
    </div>
    
  )
}

export default Home
