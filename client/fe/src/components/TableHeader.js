import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { DropdownHeader } from "react-bootstrap";
import { useEmployees } from "../context/employeeContext";
import { divisionFilter, positionFilter } from "./helper/dataHelper";

const TableHeader = () => {
  const {
    state,
    setSelectedPosition,
    setSelectedDivision,
    setWorkingStatus,
    clearFilter,
  } = useEmployees();
  const {
    employees,
    selectedPosition,
    selectedDivision,
    selectedWorkingStatus,
  } = state;

  const handleSelectPosition = (position) => {
    setSelectedPosition(position);
  };

  const handleSelectDivision = (division) => {
    setSelectedDivision(division);
  };
  return (
    <>
      <div className="d-flex gap-2 pb-2">
        <Button variant="success" href="/create">
          Add Data
        </Button>{" "}
        <DropdownButton id="dropdown-basic-button" title="Filter">
          <DropdownHeader>Filter by Position</DropdownHeader>
          {positionFilter?.map((position, index) => (
            <Dropdown.Item
              key={index}
              className="fs-6"
              onClick={() => handleSelectPosition(position)}
            >
              {position}{" "}
              {selectedPosition.includes(position) && (
                <i className="bi bi-check-lg ms-2"></i>
              )}
            </Dropdown.Item>
          ))}

          <Dropdown.Divider />
          <DropdownHeader>Filter by Division</DropdownHeader>
          {divisionFilter?.map((division, index) => (
            <Dropdown.Item
              key={index}
              className="fs-6"
              onClick={() => handleSelectDivision(division)}
            >
              {division}{" "}
              {selectedDivision.includes(division) && (
                <i className="bi bi-check-lg ms-2"></i>
              )}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />

          <DropdownHeader>Filter by workingStatus</DropdownHeader>
          <Dropdown.Item
            className="fs-6"
            onClick={() => setWorkingStatus("Contract")}
          >
            Contract{" "}
            {selectedWorkingStatus.includes("Contract") && (
              <i className="bi bi-check-lg ms-2"></i>
            )}
          </Dropdown.Item>
          <Dropdown.Item
            className="fs-6"
            onClick={() => setWorkingStatus("Full-time")}
          >
            Full-time{" "}
            {selectedWorkingStatus.includes("Full-time") && (
              <i className="bi bi-check-lg ms-2"></i>
            )}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            {" "}
            <Button onClick={() => clearFilter("Full-time")}>Clear</Button>{" "}
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </>
  );
};

export default TableHeader;
