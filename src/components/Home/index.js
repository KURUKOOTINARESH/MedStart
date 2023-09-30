import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios"
import "./index.css"
import { useNavigate } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Home = () => {
  const [latLng,setLatLng] = useState({})
  const [hospitalsData,setHospitalsData] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatLng({
          lat : position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  },[])

  useEffect(()=>{
    if(Object.keys(latLng).length >0){
      //API call for current location
      //const geoApi = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latLng.lng},${latLng.lat},50000&bias=proximity:80.3204306,17.5895257&limit=20&apiKey=2ed9953e3f714e4a949c6018a2257360`
      //API CALL for random location
      const geoApi = 'https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:80.3204306,17.5895257,50000&bias=proximity:80.3204306,17.5895257&limit=20&apiKey=2ed9953e3f714e4a949c6018a2257360'
      axios.get(geoApi).then(res=>{
        const featuresArr = res.data.features;
        const hospitals = []
        featuresArr.map((feature,index)=>{
            if(feature.properties.name !== undefined){
            const firstName = (feature.properties.name).split(" ")
            const email = firstName[0]+'@gmail.com'
            const website = "www." + firstName[0]+".com"
            const hospital = {
                id : index,
                name : feature.properties.name,
                address : feature.properties.address_line2,
                city : feature.properties.city,
                state : feature.properties.state,
                country: feature.properties.country,
                distance : feature.properties.distance,
                lat : feature.properties.lat,
                lon : feature.properties.lon,
                formatted : feature.properties.formatted,
                email,
                website
            }
            hospitals.push(hospital)
        }
        })
        setHospitalsData(hospitals)
      })
    }
    
  },[latLng])

  return (
    <div className='home-page'>
        <div className='cards-con'>
        {
            hospitalsData.map((hospital,index)=>{
            return (
                
                <Card 
                    className='hospital-card' 
                    sx={{ width: 600,padding:"1rem",margin: "1rem",border:"1px solid",textAlign: "start" }}
                    onClick={()=>navigate("/details",{state:{latLng,hospital}})}
                    key={index}
                >
                 <CardContent>
                   <Typography sx={{ fontSize: 28 }} variant="h3" color="text.primary" gutterBottom>
                   {hospital.name}
                   </Typography>
                   <hr style={{border:"2px solid gray"}}/>
                   <Typography >
                   {hospital.address}
                   </Typography>
                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   {hospital.state}, {hospital.country}, {hospital.email}
                   </Typography>
                   <Typography >
                   {hospital.website}
                   </Typography>
                 </CardContent>
               </Card>
            )
            })
        }
        </div>
    </div>
  )
}

export default Home