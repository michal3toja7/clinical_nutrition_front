import signInService from '../_services/SignInService';
import Cookies from 'js-cookie';

export default function authHeader() {
    const token = Cookies.get("token") ? Cookies.get("token") : null;
    if (token) {
        return {'Authorization': `Bearer ${token}`};
    } else {
        return {};
    }
}