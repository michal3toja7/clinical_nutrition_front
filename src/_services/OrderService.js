import axios from 'axios';
import API_URL from './Globals'
import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const ORDER_API_BASE_URL = (API_URL + '/user/zamowienie');

class OrderService {

    fetchOrders() {
        return axios.get(ORDER_API_BASE_URL, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchOrdersByJos(jos) {
        if (jos === null || jos === undefined)
            return false
        return axios.post(ORDER_API_BASE_URL + '/jos', jos, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchOrderById(orderId) {
        return axios.get(ORDER_API_BASE_URL + '/' + orderId, {headers: authHeader()})
            .catch(handleResponse);
    }

    deleteOrder(orderId) {
        return axios.delete(ORDER_API_BASE_URL + '/' + orderId, {headers: authHeader()})
            .catch(handleResponse);
    }

    addOrder(order) {
        return axios.post(ORDER_API_BASE_URL, order, {headers: authHeader()})
            .catch(handleResponse);
    }

    editOrder(order) {

        return axios.put(ORDER_API_BASE_URL + '/' + order.id, order, {headers: authHeader()})
            .catch(handleResponse);
    }

}

export default new OrderService();