import axios from 'axios';
import API_URL from './Globals'
import authHeader from '../_helpers/authHeader';
import handleResponse from '../_helpers/handleResponse';

const PATIENT_API_BASE_URL = (API_URL + '/user/pacjent');

class PatientService {

    fetchPatients() {
        return axios.get(PATIENT_API_BASE_URL, {headers: authHeader()})
            .catch(handleResponse);
    }

    fetchPatientById(patientId) {
        return axios.get(PATIENT_API_BASE_URL + '/' + patientId, {headers: authHeader()})
            .catch(handleResponse);
    }

    deletePatient(patientId) {
        return axios.delete(PATIENT_API_BASE_URL + '/' + patientId, {headers: authHeader()})
            .catch(handleResponse);
    }

    addPatient(patient) {
        return axios.post(PATIENT_API_BASE_URL, patient, {headers: authHeader()})
            .catch(handleResponse);
    }

    editPatient(patient) {

        return axios.put(PATIENT_API_BASE_URL + '/' + patient.id, patient, {headers: authHeader()})
            .catch(handleResponse);
    }

}

export default new PatientService();