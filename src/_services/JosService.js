import axios from 'axios';
import API_URL from './Globals'
import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const JOS_API_BASE_URL = (API_URL + '/user/jos');

class JosService {

    fetchJoss() {
        return axios.get(JOS_API_BASE_URL, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchJossByPremission() {
        return axios.get(JOS_API_BASE_URL + "/premission", {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchJosById(josId) {
        return axios.get(JOS_API_BASE_URL + '/' + josId, {headers: authHeader()})
            .catch(handleResponse);
    }

    deleteJos(josId) {
        return axios.delete(JOS_API_BASE_URL + '/' + josId, {headers: authHeader()})
            .catch(handleResponse);
    }

    addJos(jos) {
        return axios.post(JOS_API_BASE_URL, jos, {headers: authHeader()})
            .catch(handleResponse);
    }

    editJos(jos) {

        return axios.put(JOS_API_BASE_URL + '/' + jos.id, jos, {headers: authHeader()})
            .catch(handleResponse);
    }

}

export default new JosService();