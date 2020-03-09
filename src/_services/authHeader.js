import signInService from '../_services/SignInService';

export default function authHeader() {
    const currentUser = signInService.currentUserValue;  
    if (currentUser && currentUser.token) {
        return { 'Authorization': `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}