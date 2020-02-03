import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import signInService from "../_services/SignInService";


export default function UserMenu() {

return(
    <div style= {{height: '400px'}}>
        <div style={useStyles}>
        
        <ul>Zamówienia</ul>
        <ul>Zamówienia do realizacji</ul>
        <ul>Zamówienia zrealizowane</ul>
        <ul>Zamówienia zapisane</ul>

        </div>

        <div style={useStyles}>
        
        <ul>Rejestr Pacjentów</ul>
        </div>

        <div style={useStyles}>
        
        <ul>Raporty</ul>

        </div>

    </div>
)
}
const useStyles= {
        float: 'left',
        width: '33%',
      
    }