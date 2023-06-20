import React, { useEffect } from 'react';
import './Main.css';
import { useState } from 'react';
import EventCard from '../../components/Card/Card';
import SideImage from "./do_event.avif";
import Background from "./picture_a.jpg";
function Main() {
    const [events,setEvents]=useState([]);
    function user(){
        window.location.href="/signin"
    }

    function admin(){
        window.location.href="/signin/admin"
    }
    useEffect(()=>{
      const getEvents= async()=>{
        const response = await fetch(process.env.REACT_APP_API_URL+'getevents');
        const json = await response.json();
        setEvents(json);
      }
      getEvents();
    },[])

    function getMultipleRandom(arr, num) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
    
      return shuffled.slice(0, num);
    }
    let arr=getMultipleRandom(events,4)

  return (
    <>
      <img src={Background} alt="background" width="100%" style={{height: '80vh'}}/>
      <div className='container'>
          
          <h1 className='title'>Rievera - Event Management Page</h1>


          <div className='flexi'> 
            <div className='button'>
              <button onClick={admin}>Sign In as Admin</button>
              <button onClick={user}>Sign In as User</button>
            </div>
            <img src={SideImage} alt="buddy" width="400px" height="400px" className='image'/>
          </div>

          <div style={{display:'flex',flexWrap:'wrap'}}>
              {arr.map((newevent) => (

                  <EventCard key={newevent._id} eventname={newevent} state={" "}/>

              ))}
          </div>
        </div>
    </>
  )
}

export default Main