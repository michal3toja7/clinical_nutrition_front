import React, { Component } from 'react'
import StudyService from "../../_services/StudyService";
import PatientService from "../../_services/PatientService";
import StudyComponent from './StudyComponent';
import { Typography } from '@material-ui/core';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';



class ListStudyComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idPacjenta: window.localStorage.getItem("patientId"),
            initialPatients: [],
            studys: [],
            patient: {},
            title: 'Pomiary Pacjenta',
            newActive:false,
        }
        this.props.title(this.state.title);
        this.addStudy = this.addStudy.bind(this);
        this.reloadStudyList = this.reloadStudyList.bind(this);
        
    }

    
    componentDidMount() {
        this.reloadStudyList();
        PatientService.fetchPatientById(this.state.idPacjenta)
        .then((result) => this.setState({patient: result.data}));
    }

    updateList(){
        this.reloadStudyList();
      }

    reloadStudyList() {
        StudyService.fetchStudys(this.state.idPacjenta)
            .then(result =>{ this.setState({studys: result.data.sort((a, b) => {return new Date(b.dataPomiaru) - new Date(a.dataPomiaru)}),
                                            newActive:false})     
        });
    }


    addStudy() {
        this.setState({newActive: true})
    }


    render() {
        return (
            <div style={flexStyle}>
                <div component={Paper} style={{width:"100%", marginTop: '-30px'}}>
                    <PeopleAltRoundedIcon style={iconStyle}></PeopleAltRoundedIcon>
                    <Typography variant="h4" style={{marginTop: '25px'}} fullwidth align="left"><b>Pacjent: </b>{this.state.patient.imiona} {this.state.patient.nazwisko}</Typography>
                    <Typography variant="h5" align="left"><b>Pesel: </b>{this.state.patient.pesel}</Typography>
                    <Button style={{float: 'right'}} onClick={this.addStudy} variant="contained" color="primary">Dodaj pomiar</Button>
                </div>

                {this.state.newActive && (
                <div style={{width: '100%',marginBottom:'20px'}}>
                    <StudyComponent key='0' idPacjenta={this.state.idPacjenta} updateList={() => this.updateList()} />
                </div>
                )}


                {this.state.studys.map(row => (
                    <div key={row.id} style={{width: '100%',marginBottom:'20px'}}>
                    <StudyComponent key={row.id} updateList={() => this.updateList()} pomiar={row}/>
                    </div>

                ))}

            </div>                        

        )
        }
}

const iconStyle={
    clear: "both",
    transform: "scale(6)", 
    margin: "60px",
    float: 'left'
}

const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}

export default ListStudyComponent;