import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate,Navigate} from 'react-router-dom';
import AlertDialog from '../Alert/Alert';
import { useState } from 'react';

function EventCard({eventname,state,userId,del_event}) {
  const [alert,setAlert]=useState(false);
  const navigate=useNavigate();
  const url=eventname.website;
  const onclick=()=>{
    window.open(url,"_blank");
  }

  const Register= async()=>{
    
    const response=await fetch('http://localhost:3000/register',{
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            { 
                userId:userId,
                eventId:eventname._id
            }
        )
    });
    
    const json = await response.json();
    window.location.reload(false);

  }

  const Deregister= async()=>{
    
    const response=await fetch('http://localhost:3000/deleteRegister',{
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            { 
                userId:userId,
                eventId:eventname._id
            }
        )
    });
    const json = await response.json();
    window.location.reload(false);

  }

  const Update= async()=>{
      
  }
  
  const utility=()=>{
    const deleteEvent= async()=>{
      const response = await fetch(`http://localhost:3000/deleteEvent/${userId}`,{
        method:"DELETE"
      });
      const json = await response.json();
      setAlert(false);
      window.location.reload(false);
    }
    deleteEvent();
  }
  const futility=()=>{
    setAlert(false);
  }

  const handleClick=async()=>{
      console.log(state);
      if(state==="Register")
          Register();
      else if(state==="Deregister")
          Deregister();
      else
          Update();
  }
  
  return (
    <Card sx={{ width:.40 ,margin:"5%"}}>
    {alert&& <AlertDialog data={"Are you sure, you want to delete event"} utility={utility} futility={futility}/>}
      <CardMedia
        component="img"
        height="300"
        image={eventname.image}
        alt={eventname.name}
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {eventname.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {eventname.text}

        </Typography>
      </CardContent>
      <CardActions>
        {del_event?(
            <Button size="small" onClick={()=>setAlert(true)} style={{color:"red"}}>Delete</Button>
          ):( 
            <Button size="small" onClick={onclick}>Visit Website</Button>
        )}
    
        <Button size="small" onClick={handleClick} style={{color:"green"}}>{state}</Button>
      </CardActions>
      
    </Card>
  );
}

export default EventCard;

