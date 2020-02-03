import signInService from '../_services/SignInService';

export default function handleResponse(error) {
    if (error.response.status === 401 || error.response.status === 403 ) {
        signInService.logout();
    }
}