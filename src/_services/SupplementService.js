import axios from 'axios';
import API_URL from './Globals'
import authHeader  from '../_helpers/authHeader';
import handleResponse  from '../_helpers/handleResponse';

const PREPARATION_API_BASE_URL = (API_URL+'/user/dodatek');

class SupplementService {
 
    fetchSupplements() {
        return axios.get(PREPARATION_API_BASE_URL,{headers: authHeader()})
        .catch(handleResponse);
    }

    fetchSupplementById(supplementId) {
        return axios.get(PREPARATION_API_BASE_URL + '/' + supplementId,{headers: authHeader()})
        .catch(handleResponse);
    }

    deleteSupplement(supplementId) {
        return axios.delete(PREPARATION_API_BASE_URL + '/' + supplementId,{headers: authHeader()})
        .catch(handleResponse);
    }

    addSupplement(supplement) {
        return axios.post(PREPARATION_API_BASE_URL, supplement,{headers: authHeader()})
        .catch(handleResponse);
    }

    editSupplement(supplement) {

        return axios.put(PREPARATION_API_BASE_URL + '/' + supplement.id, supplement, {headers: authHeader()})
        .catch(handleResponse);
    }

}

export default new SupplementService();