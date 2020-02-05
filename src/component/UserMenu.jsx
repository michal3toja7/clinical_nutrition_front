import React, {useState} from 'react';
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



export default function UserMenu(props) {
    props.title('Menu');
    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChangeIndex = index => {
        setValue(index);
      };
      const isAdmin = true;

return(
    <div>
      <Tabs value={value} onChange={handleChange} variant="fullWidth"  indicatorColor="primary" textColor="primary" centered>
        <Tab label="Menu Użytkownika" {...a11yProps(0)} style={{fontWeight: "bold"}}/>
        {isAdmin &&(
        <Tab label="Menu Administratora" {...a11yProps(1)} style={{fontWeight: "bold"}}/>
        )}
      </Tabs>

        <TabPanel value={value} index={0} >
            <div style= {flexStyle}>
                <div style={{width: "33%"}}>   
                    <ul style={{listStyle: "none", fontWeight: "bold"}}>
                        <li><Button><ShoppingBasketRoundedIcon style={iconStyle}></ShoppingBasketRoundedIcon></Button></li>
                        <li><Button>Zamówienia</Button></li>     
                        <li><Button>Zamówienia do realizacji</Button></li>
                        <li><Button>Zamówienia zrealizowane</Button></li>
                        <li><Button>Zamówienia zapisane</Button></li>
                    </ul>
                </div>

                <div style={{width: "33%"}}>   
                    <ul style={{listStyle: "none"}}>
                        <li><Button><PeopleAltRoundedIcon style={iconStyle}></PeopleAltRoundedIcon></Button></li>
                        <li><Button>Rejestr pacjentów</Button></li>     
                        <li><Button>Dodaj pacjenta</Button></li>
                        <li><Button>Edytuj Pacjenta</Button></li>

                    </ul>
                </div>

                <div style={{width: "33%"}}>   
                    <ul style={{listStyle: "none"}}>
                        <li><Button><DescriptionRoundedIcon style={iconStyle}></DescriptionRoundedIcon></Button></li>
                        <li><Button>Raporty</Button></li>     
                    </ul>
                </div>

            </div>
        </TabPanel>

        <TabPanel value={value} index={1} >
            <div style={flexStyle}>
                <div style={{width:"50%"}}>
                    <ul style={{listStyle: "none"}}>
                        <li><Button onClick={() => props.history.push("/admin/users")}>
                            <AssignmentIndRoundedIcon style={iconStyle}></AssignmentIndRoundedIcon>
                        </Button></li>
                        <li><Button onClick={() => props.history.push("/admin/users")}>
                            Lista użytkowników
                        </Button></li>
                        <li><Button onClick={() => props.history.push("/admin/add-user")}>
                            Dodaj użytkownika
                        </Button></li>
                        <li><Button onClick={() => props.history.push("/admin/users")}>
                            Edytuj użytkownika
                        </Button></li>
                    </ul>
                </div>

                <div style={{width:"50%"}}>
                    <ul style={{listStyle: "none"}}>
                            <li><Button onClick={() => props.history.push("/admin/jos")}>
                                <BusinessRoundedIcon style={iconStyle}></BusinessRoundedIcon>
                            </Button></li>
                            <li><Button onClick={() => props.history.push("/admin/jos")}>
                                Lista Jednostek Organizacyjnych
                            </Button></li>
                            <li><Button onClick={() => props.history.push("/admin/add-jos")}>
                                Dodaj Jednostkę Organizacyjną
                            </Button></li>
                            <li><Button onClick={() => props.history.push("/admin/jos")}>
                                Edytuj Jednostkę Organizacyjną
                            </Button></li>
                    </ul>
                </div>  
            </div>    
        </TabPanel>
        </div>
)
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