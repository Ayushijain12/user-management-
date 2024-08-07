import axios from 'axios';
import { 
  LOGIN_WITH_EMPLOYEE, 
  LOGIN_WITH_EMPLOYEE_SUCCESS, 
  LOGIN_WITH_EMPLOYEE_FAILURE,

  REGISTER_WITH_EMPLOYEE, 
  REGISTER_WITH_EMPLOYEE_SUCCESS, 
  REGISTER_WITH_EMPLOYEE_FAILURE,

  SUPER_WITH_EMPLOYEE, 
  SUPER_WITH_EMPLOYEE_SUCCESS, 
  SUPER_WITH_EMPLOYEE_FAILURE,

} from './actionTypes';

export const loginToEmp = (values) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_WITH_EMPLOYEE });
    try {
      const response = await axios.post('http://localhost:8081/login',values ); 
      dispatch({
        type: LOGIN_WITH_EMPLOYEE_SUCCESS,
        payload: response.data,
      });
      return response.data; 
    } catch (error) {
      dispatch({
        type: LOGIN_WITH_EMPLOYEE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const RegisterToEMP = (values) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_WITH_EMPLOYEE });
    try {
      const response = await axios.post('http://localhost:8081/signup',values ); 
      dispatch({
        type: REGISTER_WITH_EMPLOYEE_SUCCESS,
        payload: response.data,
      });
      return response.data; 
    } catch (error) {
      dispatch({
        type: REGISTER_WITH_EMPLOYEE_FAILURE,
        payload: error.message,
      });
    }
  };
}

  export const SuperAdminLogin = (values) => {
    return async (dispatch) => {
      dispatch({ type: SUPER_WITH_EMPLOYEE });
      try {
        const response = await axios.post('http://localhost:8081/super/login',values ); 
        dispatch({
          type: SUPER_WITH_EMPLOYEE_SUCCESS,
          payload: response.data,
        });
        return response.data; 
      } catch (error) {
        dispatch({
          type: SUPER_WITH_EMPLOYEE_FAILURE,
          payload: error.message,
        });
      }
    };
}