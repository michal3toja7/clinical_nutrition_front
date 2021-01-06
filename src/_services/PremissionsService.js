import axios from 'axios';
import API_URL from './Globals'
import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const PREMISSIONS_API_BASE_URL = (API_URL + '/admin/premissions');
const PREMISSIONS_DEF_API_BASE_URL = (API_URL + '/admin/premissionsdefinition');

class PremissionsService {

    fetchPremissionss(userId) {
        return axios.get(PREMISSIONS_API_BASE_URL + '/' + userId, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchPremissionssDef() {
        return axios.get(PREMISSIONS_DEF_API_BASE_URL, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchPremissionsById(premissionsId) {
        return axios.get(PREMISSIONS_API_BASE_URL + '/' + premissionsId, {headers: authHeader()})
            .catch(handleResponse);
    }

    addPremissions(premissions) {
        return axios.post(PREMISSIONS_API_BASE_URL, premissions, {headers: authHeader()})
            .catch(handleResponse);
    }

    editPremissions(premissions) {

        return axios.put(PREMISSIONS_API_BASE_URL + '/' + premissions.id, premissions, {headers: authHeader()})
            .catch(handleResponse);
    }

}

export default new PremissionsService();