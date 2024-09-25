import { Button, Col, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEmployees } from "../context/employeeContext";
import { useNavigate } from "react-router-dom";
import {
  positionFilter,
  divisionFilter,
} from "../components/helper/dataHelper";

function Create() {
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthDate: "",
    position: "",
    division: "",
    joinDate: "",
    workingStatus: "",
    salary: "",
  });
  const { addEmployee, getEmployeesData } = useEmployees();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      setEmployeeData({
        ...employeeData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(employeeData);
      setEmployeeData({
        firstName: "",
        lastName: "",
        address: "",
        birthDate: "",
        position: "",
        division: "",
        joinDate: "",
        workingStatus: "",
        salary: "",
      });
      await getEmployeesData();
      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const isFormValid = () => {
    return (
      employeeData.firstName &&
      employeeData.lastName &&
      employeeData.address &&
      employeeData.birthDate &&
      employeeData.position &&
      employeeData.division &&
      employeeData.joinDate &&
      employeeData.workingStatus &&
      employeeData.salary
    );
  };
  return (
    <>
      <div className="container ">
        <Stack>
          <div>
            <h2>Add New Data</h2>
          </div>
          <div className="py-2">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-md-5" xs={""}>
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupFirstName"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={employeeData.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupLastName"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={employeeData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-md-5">
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupAddress"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={employeeData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupBirthDate"
                >
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthDate"
                    value={employeeData.birthDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-md-5">
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupPosition"
                >
                  <Form.Label>Position</Form.Label>
                  <Form.Select
                    aria-label="select-position"
                    name="position"
                    value={employeeData.position}
                    onChange={handleChange}
                  >
                    <option value={""}>Select Position</option>
                    {positionFilter.map((position, index) => (
                      <option
                        key={index}
                        value={position}
                        onChange={handleChange}
                      >
                        {position}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupDivision"
                >
                  <Form.Label>Division</Form.Label>
                  <Form.Select
                    aria-label="select-division"
                    name="division"
                    value={employeeData.division}
                    onChange={handleChange}
                  >
                    <option value={""}>Select Division</option>
                    {divisionFilter.map((division, index) => (
                      <option
                        key={index}
                        value={division}
                        onChange={handleChange}
                      >
                        {division}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-md-5">
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupJoinDate"
                >
                  <Form.Label>Join Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joinDate"
                    value={employeeData.joinDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGroupWorkingStatus"
                >
                  <Form.Label>Working Status</Form.Label>
                  <Form.Select
                    aria-label="select-status"
                    name="workingStatus"
                    placeholder="Enter working status"
                    value={employeeData.workingStatus}
                    onChange={handleChange}
                  >
                    {" "}
                    <option defaultValue={""}>Select Status</option>
                    <option value={"Contract"}>Contract</option>
                    <option value={"Full-time"}>Full-time</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-md-5">
                <Form.Group as={Col} xs={12} md={6} controlId="formGroupSalary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    placeholder="Enter salary"
                    value={employeeData.salary}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <div>
                <Button size="lg" type="submit" disabled={!isFormValid()}>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Stack>
      </div>
    </>
  );
}

export default Create;
