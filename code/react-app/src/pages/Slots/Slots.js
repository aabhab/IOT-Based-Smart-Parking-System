import React,{useEffect, useState} from 'react'
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
import Typography from "@material-ui/core/Typography";
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemText from "@material-ui/core/ListItemText";
  import ListItemIcon from '@mui/material/ListItemIcon';
  import Radio from '@mui/material/Radio';
  import RadioGroup from '@mui/material/RadioGroup';
  import { Modal } from "react-responsive-modal";
  import 'react-responsive-modal/styles.css';
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
  import LocalizationProvider from '@mui/lab/LocalizationProvider';
  import TimePicker from '@mui/lab/TimePicker';
  import MuiAlert from "@mui/lab/Alert";

import axios from 'axios';

import './Slots.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Slots() {
    const [reservedSeat, setReservedSeat] = useState()
    const [seatNumber, setSeatnumber] = useState([])
    const [openModal, setOpenModal] = useState()
    const [openNoReserveModal, setOpenNoReserveModal] = useState(false)
    const [reservedData,setReservedData] = useState(null)
    const [updateUrlString, setUpdateUrlString] = useState('')
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState();
    const [snackbarMessage, setSnackbarMessage] = React.useState();
    const [snackbarDuration, setSnackbarDuration] = React.useState(5000);

    const [startTime,setStartTime] = useState(null)
    const [endTime,setEndTime] = useState(null)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const handleChangeSeatNumber = (e) => {
        // renderPassengerData(seatNumber)
        console.log(e.target.value)
        setReservedSeat(e.target.value)
        let currReservedData={...reservedData}
        currReservedData[e.target.value] = 'select'
        for (var key in currReservedData) {
            if (key!==e.target.value && currReservedData[key]=='select') {
                console.log("key",key)
                currReservedData[key] = 0;
            }
          }
          
        setReservedData(currReservedData)
        console.log("currReservedData",currReservedData)
        let fullCount =0;
        if(reservedData.field1==1){
            fullCount++;
        }else if(reservedData.field2==1){
            fullCount++;
        }else if(reservedData.field3==1){
            fullCount++;
        }else if(reservedData.field4==1){
            fullCount++;
        }

        let allFieldsString =  
                    ('field1='+(currReservedData.field1=='select'?1:currReservedData.field1)+
                    "&field2="+(currReservedData.field2=='select'?1:currReservedData.field2)+
                    "&field3="+(currReservedData.field3=='select'?1:currReservedData.field3)+
                    "&field4="+(currReservedData.field4=='select'?1:currReservedData.field4)+
                    "&field5="+fullCount+1)
                    console.log("allFieldsString",allFieldsString)
        setUpdateUrlString(allFieldsString)
    }
    const handleCloseSnackbar = (event, reason) => {
        setShowSnackbar(false);
        setSnackbarMessage("");
        setSnackbarSeverity("");
      };
    
      const handleCloseAlert = (event, reason) => {
        setShowSnackbar(false);
      };
    
    const handleSubmitDetails = e => {
        // var currentdate = new Date(); 
        // console.log('currentdate',currentdate.getTime()<endTime.getTime())
        // let occData=false
        // if(currentdate.getTime()<endTime.getTime()){
        //     occData=true
        // }
          let payload={
            userId:userData._id,
            slotName:reservedSeat,
            reserved:true,
            times:[{
                startTime:startTime,
                endTime:endTime  
            }]
          }
          console.log('payload',payload)
          axios.get('http://localhost:8080/slots/'+reservedSeat)
          .then((res)=>{
              console.log('slot data',res.data)
              let reservationPossible = true
              res.data.times.map((item)=>{
                  if(((item.startTime<=startTime) && (startTime<=item.endTime)) 
                  || ((item.startTime<=endTime) && (endTime<=item.endTime))
                  ){
                    reservationPossible=false
                  }
              })

              if(reservationPossible){
                  //Create reservation
                  let currTimes= res.data.times

                  currTimes.push({
                    startTime:startTime,
                    endTime:endTime  
                  })
                let payload={
                    userId:userData._id,
                    slotName:reservedSeat,
                    reserved:true,
                    times:currTimes
                }    
                // console.log('reservedSeat',reservedSeat)
                axios.post('http://localhost:8080/slots/reserve',payload)
                .then((data)=>{
                    console.log(data)
                    // let fullCount =0;
                    // if(reservedData.field1==1){
                    //     fullCount++;
                    // }else if(reservedData.field2==1){
                    //     fullCount++;
                    // }else if(reservedData.field3==1){
                    //     fullCount++;
                    // }else if(reservedData.field4==1){
                    //     fullCount++;
                    // }
                    // let allFieldsString =  
                    // ('field1='+(reservedData.field1=='select'?1:reservedData.field1)+
                    // "&field2="+(reservedData.field2=='select'?1:reservedData.field2)+
                    // "&field3="+(reservedData.field3=='select'?1:reservedData.field3)+
                    // "&field4="+(reservedData.field4=='select'?1:reservedData.field4)+
                    // "&field5="+fullCount)
                    console.log("updateUrlString",updateUrlString)
                    axios.get('https://api.thingspeak.com/update?api_key=HII1G767HWI527H3&'+updateUrlString)
                    .then((data)=>{
                        console.log("post thingspeak",data)
                        loadReservationData()
                        setSnackbarMessage("Created Reservation Successfully");
                        setSnackbarSeverity("success");
                        setShowSnackbar(true);
                        handleCloseModal()                          
                    }).catch((err)=>{
                        console.log(err)
                    })      
                    setSnackbarMessage("Created Reservation Successfully");
                    setSnackbarSeverity("success");
                    setShowSnackbar(true);         
                    handleCloseModal()             
                })
                .catch((err)=>{
                    console.log(err)
                    setSnackbarMessage("There was an error");
                    setSnackbarSeverity("error");
                    setShowSnackbar(true);              
                    handleCloseModal()
                })    
              }else{
                setSnackbarMessage("Reservation's timings clash");
                setSnackbarSeverity("error");
                setShowSnackbar(true);    
                handleCloseModal()      
              }

        }).catch((err)=>{
            console.log(err)

            let payload={
                userId:userData._id,
                slotName:reservedSeat,
                reserved:true,
                time:[{
                    startTime:startTime,
                    endTime:endTime  
                }]
              }    
          axios.post('http://localhost:8080/slots/reserve',payload)
          .then((data)=>{
              console.log(data)
              axios.get('https://api.thingspeak.com/update?api_key=HII1G767HWI527H3&'+reservedSeat+'=1')
              .then((data)=>{
                  console.log("post thingspeak",data)
                  loadReservationData()
                  setSnackbarMessage("Created Reservation Successfully");
                  setSnackbarSeverity("success");
                  setShowSnackbar(true);
                  handleCloseModal()                          
              }).catch((er)=>{
                  console.log(err)
              })
          })
          .catch((err)=>{
              console.log(err)
              setSnackbarMessage("There was an error");
              setSnackbarSeverity("error");
              setShowSnackbar(true); 
              handleCloseModal()         
          })

        })
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }
    useEffect(()=>{
        const interval = setInterval(() => {
            // console.log('In setInterval');
            loadReservationData()
          }, 10000);
      
      },[])

    const loadReservationData = () =>{
        axios.get('https://api.thingspeak.com/channels/1680078/fields/1,2,3,4,5.json?results=1')
        .then((data)=>{
            // console.log("thingspeak",data.data.feeds[0])
            setReservedData(data.data.feeds[0])
        })
        .catch((err)=>{
            console.log(err)
        })
    }  

    const handleOpenModal = () =>{
        console.log("reservedSeat",reservedSeat)
        if(reservedSeat=="field3" || reservedSeat=="field4" ){
            setOpenNoReserveModal(true)
        }else{
            setOpenModal(true)
        }
    }

    const handleCloseNoReserveModal = () =>{
        setOpenNoReserveModal(false)
    }
  return (
    <div style={{backgroundColor:"#F9DA1C", height:"90vh"}}>                  
                    <div style={{width:"100%",justifyContent:"center",textAlign:"center"}}><br />
                    <Typography variant="h4" style={{textAlign:"center"}}>
                        Choose your parking slot
                    </Typography><br />
                    <form onChange={e => handleChangeSeatNumber(e)}>
                    <ol className="cabin fuselage">
                        {reservedData!==null ?
                        <Grid>
                        <Grid item sm={12} md={12}>

                            <Grid container style={{justifyContent:"center",}}>
                                <ol className="seats" type="A" style={{width:"600px"}}>
                                        <Grid item sm={4} md={4}>
                                            <li className="seat">
                                                <input type="radio" name="seat"  value="field1" id="L2S1" disabled={reservedData.field1=="1"}/>
                                                <label htmlFor="L2S1"style={{fontSize:"20px"}} >L2S1</label>
                                            </li>
                                        </Grid>
                                        <Grid item sm={4} md={4}>
                                            <li className="seat">
                                                <input type="radio" name="seat" id="L2S2" value="field2"  disabled={reservedData.field2=="1"}/>
                                                <label htmlFor="L2S2"style={{fontSize:"20px"}} >L2S2</label>
                                            </li>
                                        </Grid>
                                    </ol>
                            </Grid><br /><br />
                            <Grid container style={{justifyContent:"center"}}>
                            <ol className="seats" type="A" style={{width:"600px"}}>
                                        <Grid item sm={4} md={4}>
                                            <li className="seat">
                                                <input type="radio"  name="seat" value="field3" id="L1S1"  disabled={reservedData.field3=="1"}/>
                                                <label htmlFor="L1S1" style={{fontSize:"20px"}} >L1S1</label>
                                            </li>
                                        </Grid>
                                        <Grid item sm={4} md={4}>
                                            <li className="seat">
                                                <input type="radio" name="seat" value="field4" id="L1S2"  disabled={reservedData.field4=="1"}/>
                                                <label htmlFor="L1S2"style={{fontSize:"20px"}} >L1S2</label>
                                            </li>
                                        </Grid>
                                    </ol>
                            </Grid>
                        </Grid>

                        </Grid>
                        :
                        <div style={{color:"blue"}}>Loading...</div>    
                    }
                            </ol>
                        </form>

                    </div>
                    <br /><br />
            <div style={{textAlign:"center"}}>
                <Button onClick={handleOpenModal} color="primary" variant="outlined">
                    Confirm Details
                </Button>
            </div>
    <Modal
        open={openModal}
        onClose={handleCloseModal}
        center
        >
        <div>
            <Grid container spacing={1} style={{width:"300px"}}>
                <Typography  style={{textAlign:"center"}}>
                    <b>Select Time Period</b>
                </Typography>
            <Grid item sm={12} md={12}><br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => {
                    setStartTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    variat="outlined"
                /><br /><br />
                <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={(newValue) => {
                    setEndTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
                <br /><br />
                <Button onClick={handleSubmitDetails} color="primary" variant="outlined">
                    Reserve Slot
                </Button>
            </Grid>
            </Grid>
      </div>
    </Modal>

    <Modal
        open={openNoReserveModal}
        onClose={handleCloseNoReserveModal}
        center
        
    >
        <div style={{padding:"20px 20px"}}>
            Sorry cannot reserve this slot.
        </div>
    </Modal>
    <Snackbar
          autoHideDuration={snackbarDuration}
          open={showSnackbar}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseAlert} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
    </Snackbar>

    </div>
  )
}

export default Slots