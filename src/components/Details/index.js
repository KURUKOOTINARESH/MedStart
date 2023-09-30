import React from 'react'
import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import "./index.css"

const Details = () => {
  const location = useLocation()
  const {latLng,hospital} = location.state
  const [userFormattedAddress, setUserFormattedAddress] = useState('')
  const [steps,setSteps] = useState([])

  useEffect(()=>{
    const geoRouteApi = `https://api.geoapify.com/v1/routing?waypoints=17.4292454,78.4531264|17.5893696,80.3225069&mode=drive&apiKey=2ed9953e3f714e4a949c6018a2257360`
    axios.get(geoRouteApi).then(res=>{
        setSteps(res.data.features[0].properties.legs[0].steps)
      })
    
    const geoAddressApi = `https://api.geoapify.com/v1/geocode/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json&apiKey=2ed9953e3f714e4a949c6018a2257360`
    axios.get(geoAddressApi).then(res=>{
        setUserFormattedAddress(res.data.results[0].formatted)
      })

  })
  return (
    <div className='details-page'>
        <Card 
            className='left-section' 
            sx={{ width: 600,height:"fit-content",padding:"1rem",margin: "1rem",border:"1px solid",textAlign: "start" }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 28 }} variant="h3" color="text.primary" gutterBottom>
                {hospital.name}
                </Typography>
                <hr style={{border:"2px solid gray"}}/>
                <Typography >
                    <span style={{fontWeight:"bold"}}>User Latitude : </span> {latLng.lat}
                    <br/>
                    <span style={{fontWeight:"bold"}}>User Longitude : </span>{latLng.lng}
                    <br/>
                    <span style={{fontWeight:"bold"}}>User Formatted Address : </span>{userFormattedAddress}
                    <br/>
                    <img src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${latLng.lng},${latLng.lat}2&zoom=14&apiKey=2ed9953e3f714e4a949c6018a2257360
                    `} alt='user-map' style={{width:"500px",margin:"1rem",boxShadow:"0 0 8px 0"}}/> 
                </Typography>
                <hr/>
                <Typography >
                    <span style={{fontWeight:"bold"}}>Hospital Latitude : </span> {hospital.lat}
                    <br/>
                    <span style={{fontWeight:"bold"}}>Hospital Longitude : </span>{hospital.lon}
                    <br/>
                    <span style={{fontWeight:"bold"}}>Hospital Formatted Address : </span>{hospital.formatted}
                    <br/>
                    <img src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${hospital.lon},${hospital.lat}2&zoom=14&apiKey=2ed9953e3f714e4a949c6018a2257360
                    `} alt='hospital-map' style={{width:"500px",margin:"1rem",boxShadow:"0 0 8px 0"}}/> 
                </Typography>
                <hr/>
                <Typography >
                    <span style={{fontWeight:"bold"}}>Hospital Website : </span> {hospital.website}
                    <br/>
                    <span style={{fontWeight:"bold"}}>Hospital Email : </span>{hospital.email}
                    <br/>
                    <span style={{fontWeight:"bold"}}>States : </span>{hospital.state}
                    <br/>
                    <span style={{fontWeight:"bold"}}>City : </span>{hospital.city}
                </Typography>
            </CardContent>
        </Card>
        <Card 
            className='right-section' 
            sx={{ width: 600,padding:"1rem",margin: "1rem",border:"1px solid",textAlign: "start" }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 28 }} variant="h3" color="text.primary" gutterBottom>
                Directions to Hospital
                </Typography>
                <Timeline>
                {
                    steps.map((step,index)=>{
                    return(
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>{step.instruction.text}</TimelineContent>
                        </TimelineItem>
                    )})
                }
                </Timeline>
            </CardContent>
        </Card> 
    </div>
  )
}

export default Details