import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import josService from "../_services/JosService";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';


class UserMenu extends Component{
        constructor(props){
            super(props);
            this.state ={
                title: 'Menu',
                isAdmin: true,
                message: null,
                joss: [],
                currentJos: JSON.parse(localStorage.getItem("currentJos")),
                value: 0,
                fieldWidth :'48%',
                test: {}
            }
            this.props.title(this.state.title);
        }

    componentDidMount(){
        josService.fetchJoss()
              .then(result => {this.setState({joss: result.data})})
    }


     handleChange = (event, newValue) => {
        this.setState({value:newValue});
    };
     handleChangeIndex = index => {
        this.setState({value: index});
      };
    
      onSetJos = (value) =>{
      this.setState({ currentJos: value } )
      window.localStorage.setItem("currentJos", JSON.stringify(value))
    };

render(){
    return(
        <div>
        <Tabs value={this.state.value} onChange={this.handleChange} variant="fullWidth"  indicatorColor="primary" textColor="primary" centered>
            <Tab label="Menu Użytkownika" {...a11yProps(0)} style={{fontWeight: "bold"}}/>
            {this.state.isAdmin &&(
            <Tab label="Menu Administratora" {...a11yProps(1)} style={{fontWeight: "bold"}}/>
            )}
        </Tabs>
            <TabPanel value={this.state.value} index={0} >
            <Autocomplete
                            id="currentJos"
                            options={this.state.joss}
                            name='currentJos'
                            disableClearable
                            value={this.state.currentJos}
                            getOptionLabel={option => option.kod+ ' '+ option.nazwa}
                            onChange={(event, value) => this.onSetJos(value)}
                            style={{  display:'inline'}}
                            margin= 'normal'
                            getOptionDisabled={option => option.rodzaj!=='APT'}
                            renderInput={params => (
                        <TextField variant="outlined" margin= 'normal' style={{width: '100%'}} {...params} 
                        label='Jednostka Organizacyjna'  />
                        )}
                        />

                <div style= {flexStyle}>

                    <div style={{width: "25%"}}>   
                        <ul style={{listStyle: "none", fontWeight: "bold"}}>
                            <li><Button><ShoppingBasketRoundedIcon style={iconStyle}></ShoppingBasketRoundedIcon></Button></li>
                            <li><Button onClick={() => this.props.history.push("/orderList")}>Zamówienia</Button></li>     
                            <li><Button>Zamówienia do realizacji</Button></li>
                            <li><Button>Zamówienia zrealizowane</Button></li>
                            <li><Button>Zamówienia zapisane</Button></li>
                        </ul>
                    </div>

                    <div style={{width: "25%"}}>   
                        <ul style={{listStyle: "none"}}>
                            <li><Button><PeopleAltRoundedIcon style={iconStyle}></PeopleAltRoundedIcon></Button></li>
                            <li><Button onClick={() => this.props.history.push("/patients")}>
                                Rejestr pacjentów
                                </Button></li>     
                            <li><Button onClick={() => this.props.history.push("/add-patient")}>Dodaj pacjenta</Button></li>
                            <li><Button onClick={() => this.props.history.push("/patients")}>Edytuj Pacjenta</Button></li>

                        </ul>
                    </div>

                    <div style={{width: "25%"}}>   
                        <ul style={{listStyle: "none"}}>
                            <li><Button><DescriptionRoundedIcon style={iconStyle}></DescriptionRoundedIcon></Button></li>
                            <li><Button>Raporty</Button></li>     
                        </ul>
                    </div>
                    <div style={{width: "25%"}}>   
                        <ul style={{listStyle: "none"}}>
                            <li><Button><LocalDiningIcon style={iconStyle}></LocalDiningIcon></Button></li>
                            <li><Button  onClick={() => this.props.history.push("/preparations")}>Preparaty</Button></li>
                            <li><Button  onClick={() => this.props.history.push("/add-preparation")}>Dodaj Preparat</Button></li>        
                            <li><Button  onClick={() => this.props.history.push("/preparationBags")}>Worki Żywieniowe</Button></li>
                            <li><Button  onClick={() => this.props.history.push("/add-preparationBag")}>Dodaj Worek</Button></li>      
                        </ul>
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={this.state.value} index={1} >
                <div style={flexStyle}>
                    <div style={{width:"50%"}}>
                        <ul style={{listStyle: "none"}}>
                            <li><Button onClick={() => this.props.history.push("/admin/users")}>
                                <AssignmentIndRoundedIcon style={iconStyle}></AssignmentIndRoundedIcon>
                            </Button></li>
                            <li><Button onClick={() => this.props.history.push("/admin/users")}>
                                Lista użytkowników
                            </Button></li>
                            <li><Button onClick={() => this.props.history.push("/admin/add-user")}>
                                Dodaj użytkownika
                            </Button></li>
                            <li><Button onClick={() => this.props.history.push("/admin/users")}>
                                Edytuj użytkownika
                            </Button></li>
                        </ul>
                    </div>

                    <div style={{width:"50%"}}>
                        <ul style={{listStyle: "none"}}>
                                <li><Button onClick={() => this.props.history.push("/admin/jos")}>
                                    <BusinessRoundedIcon style={iconStyle}></BusinessRoundedIcon>
                                </Button></li>
                                <li><Button onClick={() => this.props.history.push("/admin/jos")}>
                                    Lista Jednostek Organizacyjnych
                                </Button></li>
                                <li><Button onClick={() => this.props.history.push("/admin/add-jos")}>
                                    Dodaj Jednostkę Organizacyjną
                                </Button></li>
                                <li><Button onClick={() => this.props.history.push("/admin/jos")}>
                                    Edytuj Jednostkę Organizacyjną
                                </Button></li>
                        </ul>
                    </div>  
                </div>    
            </TabPanel>
            </div>
    )
    }
}


const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}
const iconStyle={
    clear: "both",
    transform: "scale(6)", 
    margin: "60px"
}
const useStyles= {
        float: 'left',
        width: '33%',
      
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
          >
            {value === index && <Box p={3}>{children}</Box>}
          </Typography>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
    
    function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }



export default  UserMenu;