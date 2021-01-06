import axios from 'axios';
import API_URL from './Globals'
import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const PREPARATION_BAG_API_BASE_URL = (API_URL + '/user/worekPreparat');

class PreparationBagService {

    fetchPreparationBags() {
        return axios.get(PREPARATION_BAG_API_BASE_URL, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchPreparationBagById(preparationBagId) {
        return axios.get(PREPARATION_BAG_API_BASE_URL + '/' + preparationBagId, {headers: authHeader()})
            .catch(handleResponse);
    }

    deletePreparationBag(preparationBagId) {
        return axios.delete(PREPARATION_BAG_API_BASE_URL + '/' + preparationBagId, {headers: authHeader()})
            .catch(handleResponse);
    }

    addPreparationBag(preparationBag) {
        return axios.post(PREPARATION_BAG_API_BASE_URL, preparationBag, {headers: authHeader()})
            .catch(handleResponse);
    }

    editPreparationBag(preparationBag) {

        return axios.put(PREPARATION_BAG_API_BASE_URL + '/' + preparationBag.id, preparationBag, {headers: authHeader()})
            .catch(handleResponse);
    }

}

export default new PreparationBagService();