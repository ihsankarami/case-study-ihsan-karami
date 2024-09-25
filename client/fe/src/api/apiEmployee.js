import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const fetchEmployeesByid = async (nip) => {
  try {
    const response = await axios.get(`${API_URL}/?nip=${nip}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const postEmployee = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const updateEmployee = async (nip, payload) => {
  try {
    // First, fetch the employee by nip to ensure it exists
    const response = await axios.get(`${API_URL}/?nip=${nip}`);

    // Check if the employee exists
    if (response.data.length === 0) {
      throw new Error("Employee not found");
    }

    // Get the employee's id
    const employeeId = response.data[0].id; // Assuming nip is unique

    const updateResponse = await axios.put(`${API_URL}/${employeeId}`, payload);
    return updateResponse.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployeeById = async (nip) => {
  try {
    // First, fetch the employee by nip to ensure it exists
    const response = await axios.get(`${API_URL}/?nip=${nip}`);

    // Check if the employee exists
    if (response.data.length === 0) {
      throw new Error("Employee not found");
    }

    // Get the employee's id
    const employeeId = response.data[0].id; // Assuming nip is unique

    // Now delete the employee using the id
    const deleteResponse = await axios.delete(`${API_URL}/${employeeId}`);
    return deleteResponse.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
