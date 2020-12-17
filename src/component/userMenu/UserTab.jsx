import React from 'react'
import Button from '@material-ui/core/Button';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



export default function UserTab(props) {



  return (
    <div>
        
        <Autocomplete
            id="currentJos"
            options={props.joss}
            name='currentJos'
            disableClearable
            value={props.currentJos}
            getOptionLabel={option => option.kod+ ' '+ option.nazwa}
            onChange={(event, value) => props.onSetJos(value)}
            style={{  display:'inline'}}
            margin= 'normal'
            renderInput={params => (
                <TextField variant="outlined" margin= 'normal' style={{width: '100%'}} {...params} 
                label='Jednostka Organizacyjna'  />
                )}
        />
        <div style={dynamicStyle(props)}>
            <div style={{width: "33%"}}>   
                <ul style={{listStyle: "none", fontWeight: "bold"}}>
                    <li><Button onClick={() => props.history.push("/orderList")}><ShoppingBasketRoundedIcon style={iconStyle}></ShoppingBasketRoundedIcon></Button></li>
                    <li><Button onClick={() => props.history.push("/orderList")}>Zamówienia</Button></li>     
                    <li><Button onClick={() => props.history.push("/orderList")&
                                                window.sessionStorage.setItem("status", "REA")}>Zamówienia do realizacji</Button></li>
                    <li><Button onClick={() => props.history.push("/orderList")&
                                                window.sessionStorage.setItem("status", "ZRE")}>Zamówienia zrealizowane</Button></li>
                    <li><Button onClick={() => props.history.push("/orderList")&
                                                window.sessionStorage.setItem("status", "ZAP")}>Zamówienia zapisane</Button></li>
                </ul>
            </div>

            <div style={{width: "33%"}}>   
                <ul style={{listStyle: "none"}}>
                    <li><Button onClick={() => props.history.push("/patients")}><PeopleAltRoundedIcon style={iconStyle}></PeopleAltRoundedIcon></Button></li>
                    <li><Button onClick={() => props.history.push("/patients")}>
                        Rejestr pacjentów
                        </Button></li>     
                    <li><Button onClick={() => props.history.push("/add-patient")}>Dodaj pacjenta</Button></li>
                </ul>
            </div>

            <div style={{width: "33%"}}>   
                <ul style={{listStyle: "none"}}>
                    <li><Button  onClick={() => props.history.push("/preparations")}><LocalDiningIcon style={iconStyle}></LocalDiningIcon></Button></li>
                    <li><Button  onClick={() => props.history.push("/preparations")}>Preparaty</Button></li>
                    <li><Button  onClick={() => props.history.push("/add-preparation")}>Dodaj Preparat</Button></li>        
                    <li><Button  onClick={() => props.history.push("/preparationBags")}>Worki Żywieniowe</Button></li>
                    <li><Button  onClick={() => props.history.push("/add-preparationBag")}>Dodaj Worek</Button></li>      
                </ul>
            </div>
        </div>
    </div>
  );

}  

function dynamicStyle(props){
      
    if(props.currentJos===null || props.currentJos===undefined){
      return({
          display: "flex",
          flexDirection: "row", 
          alignItems: "streth", 
          flexWrap: "wrap",
          pointerEvents: "none"
      })
    }
    else{
      return({
          display: "flex",
          flexDirection: "row", 
          alignItems: "streth", 
          flexWrap: "wrap",
          pointerEvents: "auto"
      })
    }
}

const iconStyle={
    clear: "both",
    transform: "scale(6)", 
    margin: "60px"
}