import React, { createContext, useReducer, useContext, useEffect } from "react";
import {
  fetchEmployees,
  postEmployee,
  fetchEmployeesByid,
  updateEmployee,
  deleteEmployeeById,
} from "../api/apiEmployee";

const initialState = {
  employees: [],
  filteredEmployees: [],
  loading: true,
  error: null,
  selectedPosition: [],
  selectedDivision: [],
  selectedWorkingStatus: [],
  selectedEmployee: [],
};

const FETCH_EMPLOYEES_SUCCESS = "FETCH_EMPLOYEES_SUCCESS ";
const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
const FETCH_EMPLOYEES_ERROR = "FETCH_EMPLOYEES_ERROR";
const ADD_EMPLOYEE_ERROR = "ADD_EMPLOYEE_ERROR";
const FETCH_EMPLOYEE_BY_ID_SUCCESS = "FETCH_EMPLOYEE_BY_ID_SUCCESS";
const FETCH_EMPLOYEE_BY_ID_ERROR = "FETCH_EMPLOYEE_BY_ID_ERROR";
const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
const UPDATE_EMPLOYEE_ERROR = "UPDATE_EMPLOYEE_ERROR";
const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
const DELETE_EMPLOYEE_ERROR = "DELETE_EMPLOYEE_ERROR";
const SET_LOADING = "SET_LOADING";
const SET_SELECTED_POSITION = "SET_SELECTED_POSITION";
const SET_SELECTED_DIVISION = "SET_SELECTED_DIVISION";
const SET_FILTERED_EMPLOYEES = "SET_FILTERED_EMPLOYEES";
const RESET_FILTER = "RESET_FILTER";
const SET_SELECTED_WORKING_STATUS = "SET_SELECTED_WORKING_STATUS";

const employeeReducer = (state, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        filteredEmployees: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_EMPLOYEES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        error: null,
      };

    case ADD_EMPLOYEE_ERROR:
      return { ...state, error: action.payload };
    case FETCH_EMPLOYEE_BY_ID_SUCCESS:
      return { ...state, selectedEmployee: action.payload, error: null };
    case FETCH_EMPLOYEE_BY_ID_ERROR:
      return { ...state, error: action.payload };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.nip === action.payload.nip ? action.payload : employee
        ),
        error: null,
      };
    case UPDATE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.nip !== action.payload.nip
        ),
        error: null,
      };
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_LOADING:
      return { ...state, loading: true };
    case SET_SELECTED_POSITION:
      return { ...state, selectedPosition: action.payload };
    case SET_SELECTED_DIVISION:
      return { ...state, selectedDivision: action.payload };
    case SET_SELECTED_WORKING_STATUS:
      return { ...state, selectedWorkingStatus: action.payload };
    case SET_FILTERED_EMPLOYEES:
      return { ...state, filteredEmployees: action.payload };
    case RESET_FILTER:
      return {
        ...state,
        filteredEmployees: state.employees, // Reset to all employees
        selectedPosition: [],
        selectedDivision: [],
        selectedWorkingStatus: [],
      };
    default:
      return state;
  }
};
const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  // Fetch employees from API
  const getEmployeesData = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const data = await fetchEmployees();
      dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_EMPLOYEES_ERROR, payload: error.message });
    }
  };

  const getEmployeeById = async (nip) => {
    dispatch({ type: SET_LOADING });
    try {
      const data = await fetchEmployeesByid(nip);
      dispatch({ type: FETCH_EMPLOYEE_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_EMPLOYEE_BY_ID_ERROR, payload: error.message });
    }
  };

  const addEmployee = async (newEmployee) => {
    try {
      // Fetch existing employees
      const employees = await fetchEmployees();

      // Format joinDate (ddmmyyyy)
      const formatJoinDate = (date) => {
        const [year, month, day] = date.split("-"); // Split into components
        return `${day}-${month}-${year}`; // Rearrange to dd-mm-yyyy
      };
      const joinDate = newEmployee.joinDate;

      const formattedDate = formatJoinDate(joinDate);
      const joinedDate = formattedDate.split("-").join(""); // Converts "dd-mm-yyyy" to "ddmmyyyy"

      // Determine the next increment based on the number of employees
      const newIncrement = String(employees.length + 1).padStart(3, "0"); // Increment based on employee count

      // Generate new NIP
      const newNip = `AQI-${joinedDate}-${newIncrement}`;
      const employeeWithNip = { ...newEmployee, nip: newNip };

      // Post the new employee with geeditEmployeenerated NIP
      const response = await postEmployee(employeeWithNip);
      dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ADD_EMPLOYEE_ERROR, payload: error.message });
    }
  };

  const editEmployee = async (nip, data) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await updateEmployee(nip, data);
      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: UPDATE_EMPLOYEE_ERROR, payload: error.message });
    }
  };

  const deleteEmployeeInState = async (id) => {
    dispatch({ type: SET_LOADING });
    try {
      await deleteEmployeeById(id);
      dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: { nip: id } });
    } catch (error) {
      dispatch({ type: DELETE_EMPLOYEE_ERROR, payload: error.message });
    }
  };

  const setSelectedPosition = (position) => {
    let updatedPositions = [...state.selectedPosition];

    if (updatedPositions.includes(position)) {
      // Remove position if it's already selected
      updatedPositions = updatedPositions.filter((pos) => pos !== position);
    } else {
      // Add position if it's not already selected
      updatedPositions.push(position);
    }

    dispatch({ type: SET_SELECTED_POSITION, payload: updatedPositions });
  };

  const setSelectedDivision = (division) => {
    let updatedDivisions = [...state.selectedDivision];

    if (updatedDivisions.includes(division)) {
      updatedDivisions = updatedDivisions.filter((div) => div !== division);
    } else {
      updatedDivisions.push(division);
    }

    dispatch({ type: SET_SELECTED_DIVISION, payload: updatedDivisions });
  };

  const setWorkingStatus = (workingStatus) => {
    let updatedworkingStatus = [...state.selectedWorkingStatus];

    if (updatedworkingStatus.includes(workingStatus)) {
      updatedworkingStatus = updatedworkingStatus.filter(
        (div) => div !== workingStatus
      );
    } else {
      updatedworkingStatus.push(workingStatus);
    }

    dispatch({
      type: SET_SELECTED_WORKING_STATUS,
      payload: updatedworkingStatus,
    });
  };

  //  to filter employees when selected position or employees change
  useEffect(() => {
    let filteredData = state.employees;

    // Filter by selected positions
    if (state.selectedPosition.length > 0) {
      filteredData = filteredData.filter((emp) =>
        state.selectedPosition.includes(emp.position)
      );
    }
    // Filter by selected divisions
    if (state.selectedDivision.length > 0) {
      filteredData = filteredData.filter((emp) =>
        state.selectedDivision.includes(emp.division)
      );
    }
    if (state.selectedWorkingStatus.length > 0) {
      filteredData = filteredData.filter((emp) =>
        state.selectedWorkingStatus.includes(emp.workingStatus)
      );
    }
    // Dispatch the correct filtered data
    dispatch({ type: SET_FILTERED_EMPLOYEES, payload: filteredData });
  }, [
    state.selectedPosition,
    state.selectedDivision,
    state.selectedWorkingStatus,
    state.employees,
  ]);

  const clearFilter = () => {
    dispatch({ type: RESET_FILTER });
  };

  // Fetch employees on mount
  useEffect(() => {
    getEmployeesData();
  }, []);
  return (
    <EmployeeContext.Provider
      value={{
        state,
        getEmployeesData,
        getEmployeeById,
        addEmployee,
        editEmployee,
        deleteEmployeeInState,
        setSelectedPosition,
        setSelectedDivision,
        setWorkingStatus,
        clearFilter,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  return useContext(EmployeeContext);
};
