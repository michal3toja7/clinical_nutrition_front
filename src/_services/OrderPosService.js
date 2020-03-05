import axios from 'axios';
import API_URL from './Globals'
import authHeader  from '../_helpers/authHeader';
import handleResponse  from '../_helpers/handleResponse';

const ORDER_POS_API_BASE_URL = (API_URL+'/user/zamowienie/pozycje');

class OrderPosService {
 
    fetchOrderPoss(orderId) {
        return axios.get(ORDER_POS_API_BASE_URL+'/zamowienie/'+orderId,{headers: authHeader()})
        .catch(handleResponse);
    }
	
    fetchOrderPosById(orderPosId) {
        return axios.get(ORDER_POS_API_BASE_URL + '/' + orderPosId,{headers: authHeader()})
        .catch(handleResponse);
    }

    addOrderPos(orderPos) {
        return axios.post(ORDER_POS_API_BASE_URL, orderPos,{headers: authHeader()})
        .catch(handleResponse);
    }

    deleteOrderPos(orderPosId) {
        return axios.delete(ORDER_POS_API_BASE_URL + '/' + orderPosId,{headers: authHeader()})
        .catch(handleResponse);
    }

    editOrderPos(orderPos) {

        return axios.put(ORDER_POS_API_BASE_URL + '/' + orderPos.id, orderPos, {headers: authHeader()})
        .catch(handleResponse);
    }

}

export default new OrderPosService();