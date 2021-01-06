import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import josService from "../../_services/JosService";
import signInService from '../../_services/SignInService';
import UserTab from './UserTab';
import AdminTab from './AdminTab';


class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Menu',
            isAdmin: signInService.currentUserValue.administrator,
            message: null,
            joss: [],
            currentJos: JSON.parse(sessionStorage.getItem("currentJos")),
            value: window.sessionStorage.getItem("tabIndex") == null ? 0 : parseInt(window.sessionStorage.getItem("tabIndex")),
            fieldWidth: '48%',
            test: {}
        }
        this.props.title(this.state.title);
    }

    componentDidMount() {
        josService.fetchJossByPremission()
            .then(result => {
                this.setState({joss: result.data})
            })
    }


    handleChange = (event, newValue) => {
        this.setState({value: newValue});
        window.sessionStorage.setItem("tabIndex", newValue)
    };


    onSetJos = (value) => {
        signInService.refreshToken(value)
        this.setState({currentJos: value})
        window.sessionStorage.setItem("currentJos", JSON.stringify(value))
    };

    render() {
        return (
            <div>
                <Tabs value={this.state.value} onChange={this.handleChange} variant="fullWidth" indicatorColor="primary"
                      textColor="primary" centered>
                    <Tab label="Menu Użytkownika" {...a11yProps(0)} style={{fontWeight: "bold"}}/>
                    {this.state.isAdmin && (
                        <Tab label="Menu Administratora" {...a11yProps(1)} style={{fontWeight: "bold"}}/>
                    )}
                </Tabs>

                <TabPanel value={this.state.value} index={0}>
                    <UserTab history={this.props.history} currentJos={this.state.currentJos} joss={this.state.joss}
                             onSetJos={(value) => this.onSetJos(value)}/>
                </TabPanel>

                <TabPanel value={this.state.value} index={1}>
                    <AdminTab history={this.props.history}/>
                </TabPanel>
            </div>
        )
    }
}


function TabPanel(props) {
    const {children, value, index, ...other} = props;

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


export default UserMenu;