// rootReducer.js
import { 
    LOGIN_WITH_EMPLOYEE, 
    LOGIN_WITH_EMPLOYEE_SUCCESS, 
    LOGIN_WITH_EMPLOYEE_FAILURE ,
    REGISTER_WITH_EMPLOYEE, 
    REGISTER_WITH_EMPLOYEE_SUCCESS, 
    REGISTER_WITH_EMPLOYEE_FAILURE ,
    SUPER_WITH_EMPLOYEE, 
    SUPER_WITH_EMPLOYEE_SUCCESS, 
    SUPER_WITH_EMPLOYEE_FAILURE 
  } from './actionTypes';
  
  
  const initialState = {
    subject: '',
    subject2: '',
    previewText: '',
    subjectLines: [
      { id: 1, value: '' },
      { id: 2, value: '' },
    ],
    emailSubjects: [],
    loading: false,
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case LOGIN_WITH_EMPLOYEE:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGIN_WITH_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          emailSubjects: action.payload,
        };
      case LOGIN_WITH_EMPLOYEE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case REGISTER_WITH_EMPLOYEE:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case REGISTER_WITH_EMPLOYEE_SUCCESS:
          return {
            ...state,
            loading: false,
            emailSubjects: action.payload,
          };
        case REGISTER_WITH_EMPLOYEE_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

          case SUPER_WITH_EMPLOYEE:
            return {
              ...state,
              loading: true,
              error: null,
            };
          case SUPER_WITH_EMPLOYEE_SUCCESS:
            return {
              ...state,
              loading: false,
              emailSubjects: action.payload,
            };
          case SUPER_WITH_EMPLOYEE_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  