import signInService from '../_services/SignInService';

export default function authHeader() {
    const currentUser = signInService.currentUser;  
    if (currentUser && currentUser.token) {
        return { 'Authorization': `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}