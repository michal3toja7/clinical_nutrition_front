import React from 'react'
import Button from '@material-ui/core/Button';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';



export default function AdminTab(props) {

  
  return (
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
  );

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