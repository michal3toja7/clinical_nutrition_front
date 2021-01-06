import axios from 'axios';
import API_URL from './Globals'
import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const PREPARATION_API_BASE_URL = (API_URL + '/user/preparat');

class PreparationService {

    fetchPreparations() {
        return axios.get(PREPARATION_API_BASE_URL, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchPreparationById(preparationId) {
        return axios.get(PREPARATION_API_BASE_URL + '/' + preparationId, {headers: authHeader()})
            .catch(handleResponse);
    }

    deletePreparation(preparationId) {
        return axios.delete(PREPARATION_API_BASE_URL + '/' + preparationId, {headers: authHeader()})
            .catch(handleResponse);
    }

    addPreparation(preparation) {
        return axios.post(PREPARATION_API_BASE_URL, preparation, {headers: authHeader()})
            .catch(handleResponse);
    }

    editPreparation(preparation) {

        return axios.put(PREPARATION_API_BASE_URL + '/' + preparation.id, preparation, {headers: authHeader()})
            .catch(handleResponse);
    }

}

export default new PreparationService();