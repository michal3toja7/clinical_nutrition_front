import axios from 'axios';
import API_URL from './Globals'
import authHeader  from '../_helpers/authHeader';
import handleResponse  from '../_helpers/handleResponse';

const STUDY_API_BASE_URL = (API_URL+'/user/pomiar');

class StudyService {
 
    fetchStudys(patientId) {
        return axios.get(STUDY_API_BASE_URL+'/pacjent/'+patientId,{headers: authHeader()})
        .catch(handleResponse);
    }
	
    fetchStudyById(studyId) {
        return axios.get(STUDY_API_BASE_URL + '/' + studyId,{headers: authHeader()})
        .catch(handleResponse);
    }

    addStudy(study) {
        return axios.post(STUDY_API_BASE_URL, study,{headers: authHeader()})
        .catch(handleResponse);
    }

    deleteStudy(studyId) {
        return axios.delete(STUDY_API_BASE_URL + '/' + studyId,{headers: authHeader()})
        .catch(handleResponse);
    }

    editStudy(study) {

        return axios.put(STUDY_API_BASE_URL + '/' + study.id, study, {headers: authHeader()})
        .catch(handleResponse);
    }

}

export default new StudyService();