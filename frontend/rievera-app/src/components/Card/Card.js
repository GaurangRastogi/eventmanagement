import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AlertDialog from '../Alert/Alert';
import { useState } from 'react';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function EventCard({eventname,state,userId,del_event}) {
  const [alert,setAlert]=useState(false);
  const [update,setUpdate]=useState(false);
  const url=eventname.website;
  const onclick=()=>{
    window.open(url,"_blank");
  }

  const Register= async()=>{
  
    const response=await fetch(process.env.REACT_APP_API_URL+'register',{
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
    
    await response.json();
    window.location.reload(false);

  }

  const Deregister= async()=>{
    
    const response=await fetch(process.env.REACT_APP_API_URL+'deleteRegister',{
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

    await response.json();
    window.location.reload(false);

  }

  const Update= async()=>{
    // /event/update
    setUpdate(true);
  }
  
  const updateUtility = async()=>{
    const name = document.getElementById("name").value;
    const capacity = document.getElementById("capacity").value;
    const venue = document.getElementById("venue").value;
    const imageLink = document.getElementById("imageLink").value;
    const description = document.getElementById("description").value;
    const websiteLink = document.getElementById("websiteLink").value;

    const response = await fetch(process.env.REACT_APP_API_URL+"event/update", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        eventId:userId,
        name,
        capacity,
        venue,
        image: imageLink,
        text: description,
        website: websiteLink,
      }),
    });

    await response.json();
    setUpdate(false);
    window.location.reload(false);
  }
  

  const utility=()=>{
    const deleteEvent= async()=>{
      const response = await fetch(process.env.REACT_APP_API_URL+`deleteEvent/${userId}`,{
        method:"DELETE"
      });
      await response.json();
      setAlert(false);
      window.location.reload(false);
    }
    deleteEvent();
  }
  const futility=()=>{
    setAlert(false);
  }

  const handleClick=async()=>{
      // console.log(state);
      if(state==="Register")
          Register();
      else if(state==="Deregister")
          Deregister();
      else
          Update();
  }
  
  return (
    <Card sx={{ width:.40 ,margin:"5%"}}>
    {alert&&<AlertDialog data={"Are you sure, you want to delete event"} utility={utility} futility={futility}/>}
    {update&& (
            <Dialog open={update} onClose={()=>setUpdate(false)}>
              <DialogTitle>Update Event</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="capacity"
                  label="Capacity"
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="venue"
                  label="Venue"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="imageLink"
                  label="Image Link"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="websiteLink"
                  label="Website Link"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>setUpdate(false)}>Cancel</Button>
                <Button onClick={()=>updateUtility()}>Update</Button>
              </DialogActions>
            </Dialog>
        )}
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

