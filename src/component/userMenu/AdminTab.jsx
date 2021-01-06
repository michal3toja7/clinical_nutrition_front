import React from 'react'
import Button from '@material-ui/core/Button';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import Grid from "@material-ui/core/Grid";


export default function AdminTab(props) {


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <ul style={{listStyle: "none"}}>
                        <li><Button onClick={() => props.history.push("/admin/users")}>
                            <AssignmentIndRoundedIcon style={iconStyle}></AssignmentIndRoundedIcon>
                        </Button></li>
                        <li><Button onClick={() => props.history.push("/admin/users")}>
                            Lista użytkowników
                        </Button></li>
                        <li><Button onClick={() => props.history.push("/admin/edit-user")}>
                            Dodaj użytkownika
                        </Button></li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ul style={{listStyle: "none"}}>
                        <li><Button onClick={() => props.history.push("/admin/jos")}>
                            <BusinessRoundedIcon style={iconStyle}></BusinessRoundedIcon>
                        </Button></li>
                        <li><Button onClick={() => props.history.push("/admin/jos")}>
                            Lista Jednostek Organizacyjnych
                        </Button></li>
                        <li><Button onClick={() => props.history.push("/admin/edit-jos")}>
                            Dodaj Jednostkę Organizacyjną
                        </Button></li>
                    </ul>
                </Grid>
            </Grid>

        </div>
    );

}

const iconStyle = {
    clear: "both",
    transform: "scale(6)",
    margin: "60px"
}