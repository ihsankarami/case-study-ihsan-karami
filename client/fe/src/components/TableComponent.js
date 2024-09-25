import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchEmployees } from "../api/apiEmployee";
import { formatThousand } from "./helper/helpers";
import { useEmployees } from "../context/employeeContext";

const TableComponent = () => {
  const { state, deleteEmployeeInState, getEmployeesData } = useEmployees();
  const { loading, filteredEmployees } = state;

  const handleDelete = async (id) => {
    await deleteEmployeeInState(id);
    await getEmployeesData();
  };

  if (loading) {
    return <div>Loading employees...</div>;
  }

  if (!filteredEmployees || filteredEmployees.length === 0) {
    return <div>No employees to display</div>;
  }

  return (
    <>
      <div>
        <Table bordered hover>
          <thead>
            <tr className="fs-5">
              <th>NIP</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
              <th>Address</th>
              <th>Division</th>
              <th>Position</th>
              <th>Join Date</th>
              <th>Salary</th>
              <th>Working Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees?.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={index} className="fs-6">
                  <td className="text-secondary ">{employee?.nip || "N/A"}</td>
                  <td>{employee?.firstName || "N/A"}</td>
                  <td>{employee?.lastName || "N/A"}</td>
                  <td>{employee?.birthDate || "N/A"}</td>
                  <td>{employee?.address || "N/A"}</td>
                  <td>{employee?.division || "N/A"}</td>
                  <td>{employee?.position || "N/A"}</td>
                  <td>{employee?.joinDate || "N/A"}</td>
                  <td>
                    {employee?.salary ? formatThousand(employee.salary) : "N/A"}
                  </td>
                  <td>{employee?.workingStatus || "N/A"}</td>
                  <td className="d-flex gap-3">
                    <a href={`/edit/:${employee?.nip}`}>
                      <i
                        role="button"
                        className="bi bi-pencil-square text-info fs-4"
                      ></i>
                    </a>
                    <a onClick={() => handleDelete(employee?.nip)}>
                      <i
                        role="button"
                        className="bi bi-trash-fill text-danger fs-4"
                      ></i>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No employees available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TableComponent;
