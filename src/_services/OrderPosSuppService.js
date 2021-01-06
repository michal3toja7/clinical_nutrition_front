import axios from 'axios';
import API_URL from './Globals'
import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const ORDER_POS_API_BASE_URL = (API_URL + '/user/zamowienie/pozycje/dodatek');

class orderPosSuppService {

    fetchorderPosSupps(orderId) {
        return axios.get(ORDER_POS_API_BASE_URL + '/pozycja/' + orderId, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchorderPosSuppById(orderPosSuppId) {
        return axios.get(ORDER_POS_API_BASE_URL + '/' + orderPosSuppId, {headers: authHeader()})
            .catch(handleResponse);
    }

    addorderPosSupp(orderPosSupp) {
        return axios.post(ORDER_POS_API_BASE_URL, orderPosSupp, {headers: authHeader()})
            .catch(handleResponse);
    }

    deleteorderPosSupp(orderPosSuppId) {
        return axios.delete(ORDER_POS_API_BASE_URL + '/' + orderPosSuppId, {headers: authHeader()})
            .catch(handleResponse);
    }

    editorderPosSupp(orderPosSupp) {

        return axios.put(ORDER_POS_API_BASE_URL + '/' + orderPosSupp.id, orderPosSupp, {headers: authHeader()})
            .catch(handleResponse);
    }

}

export default new orderPosSuppService();