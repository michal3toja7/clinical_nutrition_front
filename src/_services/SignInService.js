import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import API_URL from './Globals';
import authHeader  from '../_helpers/authHeader';




const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));

 const signInService = {
    login,
    logout,
    refreshToken,
    currentUser: currentUserSubject.asObservable(),
    isUserAuthenticated,
    get currentUserValue () { return currentUserSubject.value }
};



   async function login(user) {
    return await axios.post(API_URL+'/authenticate', user)
        .then(result => {sessionStorage.setItem('currentUser', JSON.stringify(result.data))
         currentUserSubject.next(result.data)}) 
    }

    async function refreshToken(jos) {
        if(jos===null || jos === undefined)
            return false

        return await axios.post(API_URL+'/user/refreshToken', jos,{headers: authHeader()})
            .then(result => {sessionStorage.setItem('currentUser', JSON.stringify(result.data))
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
    //   sessionStorage.removeItem('currentUser');
    //   currentUserSubject.next(null);
    }); 

    function logout() {
            axios.post(API_URL+'/user/logout',{headers: authHeader()})
            sessionStorage.clear();
            currentUserSubject.next(null);
            window.location.reload();
    }

export default signInService

