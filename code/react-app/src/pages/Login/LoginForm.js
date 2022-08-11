import React,{useState} from 'react'
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
import { useOktaAuth,withAuth } from '@okta/okta-react';
import { Redirect,useHistory } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    const { oktaAuth } = useOktaAuth();
    const history = useHistory()
    const [sessionToken, setSessionToken] = useState();  
    const [loginErrorMessage, setLoginErrorMessage]= useState(); 
    const [loginStatus, setLoginStatus]= useState(null); 

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]:
            event.target.value !== "" ? event.target.value : null,
        });
    }  
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        username: formData.email,
        password: formData.password,
      };  
      oktaAuth
      .signInWithCredentials(data)
      .then((res) => {
        const sessionToken = res.sessionToken;
        if (!sessionToken) {
          throw new Error("authentication process failed");
        }
        setSessionToken(sessionToken);

        // Check if user exists in DB
        axios.get(`http://localhost:8080/users/findByEmail/`+formData.email)
        .then(res => {
          console.log("found",res)
          setLoginStatus(true)
          setLoginErrorMessage("Success!!")
          oktaAuth.signInWithRedirect({
            //   originalUri: "/slots",
              sessionToken: sessionToken,
          });
          localStorage.setItem('userData',JSON.stringify(res.data))        
        })
        .catch((err)=>{
            console.log(err)
            let payload={
              firstName:res.user.profile.firstName,
              lastName:res.user.profile.lastName,
              email:formData.email
            }
            // add user to DB
            axios.post(`http://localhost:8080/users/post`,payload)
            .then((data)=>{
              console.log("user created success",data)
              oktaAuth.signInWithRedirect({
                //   originalUri: "/slots",
                  sessionToken: sessionToken,
              });        
            }).catch((err)=>{
              console.log(err)
            })
        })
      })
      .catch((err) =>{
        setLoginErrorMessage("Incorrect Credentials. Please try again")
        setLoginStatus(false)
      });
    };

  return (
    <div style={{backgroundColor:"#F9DA1C", height:"90vh"}}>
    <Grid container style={{justifyContent:"center",paddingTop:"150px"}}>
      <Card style={{width:"400px"}}>
        <CardContent>
        <Typography style={{textAlign:"center"}}>
            LOGIN
        </Typography><br />
        <form onSubmit={handleSubmit}>
        <Grid item sm={12} md={12} >
            <TextField
                name="email"
                value={formData.email}
                label="Email"
                type="text"
                InputLabelProps={{ shrink: true }}
                onChange={(e)=>handleChange(e)}
                fullWidth
                variant="outlined"
            />
        </Grid><br /><br />
        <Grid item sm={12} md={12} >
            <TextField
                name="password"
                value={formData.password}
                label="Password"
                type="password"
                InputLabelProps={{ shrink: true }}
                onChange={(e)=>handleChange(e)}
                fullWidth
                variant="outlined"
            />
        </Grid><br />
        <Button type="submit" color="primary" className="form__custom-button">
            Log in
        </Button>
        <div style={{color:loginStatus==true?"green":"red"}}>{loginErrorMessage}</div>
        </form>
        </CardContent>
      </Card>
    </Grid>


  </div>
  )
}

export default LoginForm