import axios from 'axios';
import API_URL from './Globals'




const currentUserSubject =JSON.parse(localStorage.getItem('currentUser'));

 const signInService = {
    login,
    logout,
    currentUser: currentUserSubject,
    isUserAuthenticated
};



async function login(user) {
        let res;
        await axios.post(API_URL+'/authenticate', user)
        .then(result => {localStorage.setItem('currentUser', JSON.stringify(result.data))
                         res= true;})
        .catch((error) =>{alert("Logowanie nie powiodło się")
                         res= false});
        return res;
    }
    
function isUserAuthenticated(){
    if (signInService.currentUser && signInService.currentUser.token) {
        return true;
    }else{
        return false;
    }

}
function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
}

export default signInService

