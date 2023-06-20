import React, { useState ,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import EventCard from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
function UserEvents() {
    const location=useLocation();
    const username=location.state.username;
    const password=location.state.password;
    const id=location.state.id;
    const [userEvent,setUserEvent]=useState([]);
    

    useEffect(()=>{
        const getUserEvent= async()=>{
            const response = await fetch(process.env.REACT_APP_API_URL+`events/${id}`);
            const json = await response.json();
            setUserEvent(userEvent=>[...userEvent,...json]);
        }
        getUserEvent();
    },[])
    
    try{
        if(userEvent.length===0)
            throw true;
        return ( 

        <div>
            <Navbar username={username} password={password} id={id}/>

                <div style={{display:'flex',flexWrap:'wrap'}}>
                    {userEvent.map((event) => (

                        <EventCard key={event._id} eventname={event} state={"Deregister"} userId={id}/>

                    ))}

                </div>
        </div>
        )
    }
    catch(e){
        return(
            <div>
                <Navbar username={username} password={password} id={id}/>
                <br/><br/><br/><br/><br/>
                <h1>No Events Registered</h1>
            </div>
        )
    }
}

export default UserEvents