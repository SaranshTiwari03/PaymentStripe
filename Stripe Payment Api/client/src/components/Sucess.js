import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Sucess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');

  const sendDataToBackend = async () => {
    try {
      const response = await fetch('http://localhost:4242/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: sessionId })
      });

      if (response.ok) {
        console.log('Data sent to backend successfully');
      } else {
        console.error('Failed to send data to backend');
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };


  useEffect(() => {
    sendDataToBackend()
   
  },[sessionId]);

  return (
    <center>
    <div style={{fontSize:"30px",alignItems:"center",marginTop:"100px"}}>Thank you for visiting </div>
    </center>
    
  )
}

export default Sucess