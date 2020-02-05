import signInService from '../_services/SignInService';

export default function authHeader() {
    const currentUser = signInService.currentUserValue;  
    console.log(currentUser)
    if (currentUser && currentUser.token) {
        return { 'Authorization': `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}