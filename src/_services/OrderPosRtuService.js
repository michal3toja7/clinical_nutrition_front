import axios from 'axios';
import API_URL from './Globals'
import authHeader  from '../_helpers/authHeader';
import handleResponse  from '../_helpers/handleResponse';

const ORDER_POS_API_BASE_URL = (API_URL+'/user/zamowienie/pozycjeRTU');

class OrderPosRtuService {
 
    fetchOrderPosRtus(orderId) {
        return axios.get(ORDER_POS_API_BASE_URL+'/zamowienie/'+orderId,{headers: authHeader()})
        .catch(handleResponse);
    }
	
    fetchOrderPosRtuById(orderPosRtuId) {
        return axios.get(ORDER_POS_API_BASE_URL + '/' + orderPosRtuId,{headers: authHeader()})
        .catch(handleResponse);
    }

    addOrderPosRtu(orderPosRtu) {
        return axios.post(ORDER_POS_API_BASE_URL, orderPosRtu,{headers: authHeader()})
        .catch(handleResponse);
    }

    deleteOrderPosRtu(orderPosRtuId) {
        return axios.delete(ORDER_POS_API_BASE_URL + '/' + orderPosRtuId,{headers: authHeader()})
        .catch(handleResponse);
    }

    editOrderPosRtu(orderPosRtu) {

        return axios.put(ORDER_POS_API_BASE_URL + '/' + orderPosRtu.id, orderPosRtu, {headers: authHeader()})
        .catch(handleResponse);
    }

}

export default new OrderPosRtuService();