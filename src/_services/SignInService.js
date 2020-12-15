import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import API_URL from './Globals';
import authHeader  from '../_helpers/authHeader';
import Cookies from 'js-cookie';



const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));

 const signInService = {
    login,
    logout,
    refreshToken,
    getCurrentUser,
    currentUser: currentUserSubject.asObservable(),
    isUserAuthenticated,
    get currentUserValue () { return currentUserSubject.value }
}



   async function login(user) {
    return await axios.post(API_URL+'/authenticate', user)
        .then(result => {Cookies.set('token',result.data)}) 
    }




    async function refreshToken(jos) {
        if(jos===null || jos === undefined)
            return false

        return await axios.post(API_URL+'/user/refreshToken', jos,{headers: authHeader()})
            .then(result => {Cookies.set('token',result.data)}) 
        }

    async function getCurrentUser() {
        return await axios.post(API_URL+'/user/getCurrentUser','',{headers: authHeader()})
            .then(result => {sessionStorage.setItem('currentUser', JSON.stringify(result.data))
                currentUserSubject.next(result.data)}) 
        }
    
    function isUserAuthenticated(){
        return (signInService.currentUserValue && authHeader())
            

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
            Cookies.remove("token");
            currentUserSubject.next(null);
            window.location.reload();
    }

export default signInService

