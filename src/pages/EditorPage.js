import React, { useEffect, useRef, useState } from 'react'
import ACTIONS from '../Actions';
import Client from '../components/Client'
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { Navigate, useLocation,useNavigate,useParams} from 'react-router-dom';
import { toast } from 'react-hot-toast';



const EditorPage = () => {
    const socketRef = useRef(null);
    const location =  useLocation();
    const {roomId}= useParams();

    const navigate = useNavigate();
    const [clients,setClients] = useState([
   
  ]);

    useEffect(() =>{
      const init = async () => {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error',(err) => console.log(err));
        socketRef.current.on('connect_failed',(err) => console.log(err));

        function handleErrors(e){
          console.log('socket error',e);
          toast.error('Socket connection failed, try again later.');
          navigate('/');
        }


        socketRef.current.emit(ACTIONS.JOIN,{
          roomId,
          username: location.state?.username,
        });

        //listening for joined event 
        socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
          if(username !== location.state.username){
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`)
          }
          setClients(clients);

        })

      };
      init();
    },[]);

   
    if(!location.state){
      return <Navigate  to ='/'/>
    }
  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
            <div className='logo'>
                <img src="https://raw.githubusercontent.com/codersgyan/realtime-code-editor/main/public/code-sync.png" 
                className='logoImage' alt='code-sync-logo'/>
            </div>
            <h3>Connected</h3>
            <div className='clientList'>
                {
                    clients.map((client)=>(
                        <Client key={client.socketId} username={client.username}/>
                    ))
                }
            </div>
        </div>
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage
