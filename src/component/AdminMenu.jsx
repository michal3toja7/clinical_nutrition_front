import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import signInService from "../service/signInService";


export default function AdminMenu() {

return(
    <div style= {{height: '400px'}}>
        <div style={useStyles}>
        
        <ul>Użytkownicy</ul>
        <ul>Uprawnienia</ul>

        </div>

        <div style={useStyles}>
        
        <ul>Struktura Organizacyjna</ul>
        </div>


    </div>
)
}
const useStyles= {
        float: 'left',
        width: '50%',
      
    }