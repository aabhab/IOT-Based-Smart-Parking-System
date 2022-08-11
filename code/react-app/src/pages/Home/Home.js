import React,{useEffect,useState} from 'react'
import { useOktaAuth} from '@okta/okta-react';
import { Redirect,useHistory,Link } from 'react-router-dom';
import {
    Grid,
    Button,
    TextField,
    Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Lottie from 'react-lottie';
import carLottie from "../../assets/car-lottie.json";
import infinite from "../../assets/infinite.json";

function Home() {
    const defaultOptionsCar = {
        loop: true,
        autoplay: true, 
        animationData: carLottie,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const defaultOptionsInf = {
        loop: true,
        autoplay: true, 
        animationData: infinite,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const history = useHistory()
    const { authState,oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    if (!authState) {
        return <div><Lottie options={defaultOptionsInf} /></div>;
    }
    
    
  return (
    (
        <Card style={{height:"90vh",backgroundColor:"#F9DA1C"}}>
            <CardContent>
            <Typography style={{textAlign:"center", fontSize:"50px", fontFamily:"Courier"}}>
                Welcome to Park World
            </Typography>
            <Typography style={{textAlign:"center", fontSize:"20px", fontFamily:"Verdana"}}>
                You can park your vehicles here based on a reservation system through our website.
                Happy Parking!!
            </Typography>
            <Lottie options={defaultOptionsCar} />
            </CardContent>
        </Card>
    )
  )
}

export default Home