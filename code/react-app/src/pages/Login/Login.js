import React, { useState,useEffect } from 'react'
import {
  Grid,
  CircularProgress,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,

} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@mui/material/Typography';
import { useOktaAuth} from '@okta/okta-react';
import { Redirect,useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import Lottie from 'react-lottie';
import infinite from "../../assets/infinite.json";

function Login(props) {
  const history = useHistory()
  const { authState,oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const defaultOptionsInf = {
    loop: true,
    autoplay: true, 
    animationData: infinite,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

  if( !authState ) { 
    return <div style={{width:"100%",height:"90vh",justifyContent:"center",textAlign:"center",backgroundColor:"white"}}>
      <Lottie 
        options={defaultOptionsInf} 
        height="400px"
        width="400px"
      />
    </div>;
  }

  return authState.isAuthenticated?
  <Redirect to ={{pathname:'/slots'}} />
  :
  <LoginForm />
}
export default Login