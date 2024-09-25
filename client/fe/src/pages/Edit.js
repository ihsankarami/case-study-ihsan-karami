import { Button, Col, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useEmployees } from "../context/employeeContext";
import { useNavigate } from "react-router-dom";
import {
  positionFilter,
  divisionFilter,
} from "../components/helper/dataHelper";
import { useParams } from "react-router-dom";

function Edit() {
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
    nip: "",
  });

  const { editEmployee, getEmployeeById, getEmployeesData, state } =
    useEmployees();
  const { selectedEmployee, error } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  const cleanedId = id?.startsWith(":") ? id?.slice(1) : id;

  const handleChange = (e) => {
    const { name, defaultValue } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: defaultValue,
    }));
  };

  useEffect(() => {
    if (cleanedId) {
      getEmployeeById(cleanedId);
    }
  }, [cleanedId]);

  useEffect(() => {
    if (selectedEmployee && selectedEmployee.length > 0) {
      const emp = selectedEmployee[0];
      setEmployeeData({
        firstName: emp.firstName ?? "",
        lastName: emp.lastName ?? "",
        address: emp.address ?? "",
        birthDate: emp.birthDate ?? "",
        position: emp.position ?? "",
        division: emp.division ?? "",
        joinDate: emp.joinDate ?? "",
        workingStatus: emp.workingStatus ?? "",
        salary: emp.salary ?? "",
        nip: emp.nip ?? "",
      });
    }
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editEmployee(cleanedId, employeeData);
      await getEmployeesData();
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
      if (!error) navigate("/");
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
                    defaultValue={employeeData.firstName}
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
                    defaultValue={employeeData.lastName}
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
                    defaultValue={employeeData.address}
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
                    defaultValue={employeeData.birthDate}
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
                    defaultValue={employeeData.position}
                    onChange={handleChange}
                  >
                    <option defaultValue={""}>Select Position</option>
                    {positionFilter.map((position, index) => (
                      <option
                        key={index}
                        defaultValue={position}
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
                    defaultValue={employeeData.division}
                    onChange={handleChange}
                  >
                    <option defaultValue={""}>Select Division</option>
                    {divisionFilter.map((division, index) => (
                      <option
                        key={index}
                        defaultValue={division}
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
                    disabled
                    type="date"
                    name="joinDate"
                    defaultValue={employeeData.joinDate}
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
                    defaultValue={employeeData.workingStatus}
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
                  <Form.Label>NIP</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    name="nip"
                    defaultValue={employeeData.nip}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={12} md={6} controlId="formGroupSalary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    placeholder="Enter salary"
                    defaultValue={employeeData.salary}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <div>
                <Button size="lg" type="submit">
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

export default Edit;
