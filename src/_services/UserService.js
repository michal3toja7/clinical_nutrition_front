import axios from 'axios';
import API_URL from './Globals'
import authHeader  from '../_helpers/authHeader';
import handleResponse  from '../_helpers/handleResponse';

const USER_API_BASE_URL = (API_URL+'/admin/users');

class UserService {
 
    fetchUsers() {
        return axios.get(USER_API_BASE_URL,{headers: authHeader()})
        .catch(handleResponse);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId,{headers: authHeader()})
        .catch(handleResponse);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId,{headers: authHeader()})
        .catch(handleResponse);
    }

    addUser(user) {
        return axios.post(USER_API_BASE_URL, user,{headers: authHeader()})
        .catch(handleResponse);
    }

    editUser(user) {

        return axios.put(USER_API_BASE_URL + '/' + user.id, user, {headers: authHeader()})
        .catch(handleResponse);
    }

}

export default new UserService();