import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import API_URL from './Globals';




const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

 const signInService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    isUserAuthenticated,
    get currentUserValue () { return currentUserSubject.value }
};



   async function login(user) {
    return await axios.post(API_URL+'/authenticate', user)
        .then(result => {localStorage.setItem('currentUser', JSON.stringify(result.data))
         currentUserSubject.next(result.data)}) 
    }
    
function isUserAuthenticated(){
    if (signInService.currentUserValue && signInService.currentUserValue.token) {
        return true;
    }else{
        return false;
    }

}

window.addEventListener('beforeunload', function (e) { 
    e.preventDefault(); 
    e.returnValue = ''; 
 //   localStorage.removeItem('currentUser');
 //   currentUserSubject.next(null);
}); 

function logout() {
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
        window.location.reload();
}

export default signInService

