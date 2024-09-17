# Take-Home Test: Kintone Developer

_Right click on the md file and select open preview in vscode to read this md_

# Front End Test

## Objective:

To assess your ability to develop a basic CRUD (Create, Read, Update, Delete) application using a JavaScript framework or vanilla JavaScript. While we're looking for Kintone developers, this test will evaluate your foundational skills in web development.

## Task:

Create a simple table application that allows users to:

- Add new rows to the table with specified data.
- Edit existing rows and update their data.
- Delete rows from the table.

## Requirements:

- **Technology**: Choose any JavaScript framework or library you are comfortable with (e.g., React, Vue, jQuery, vanilla JavaScript).
- **Data Storage**: Use the provided JSON Server.
- **User Interface**: Design a user-friendly interface with clear labels and input fields.
- **Functionality**: Ensure the CRUD operations work as expected, with proper error handling and validation.
- **State Management**: Implement state management using a suitable approach for your chosen framework (e.g., Redux, Pinia, useState/useReducer).

### Additional Considerations (optional):

- **Responsiveness**: Consider how your application will adapt to different screen sizes.

## Submission:

- Create a public GitHub repository with format "case-study-[nama-anda]"
- Send the link to the repository via email to bella@aqi.co.id and cc to aulya.khatulistivani@aqi.co.id, taufiqurahman.alghani@aqi.co.id & muhamad.rifaldi@aqi.co.id with title [Nama-anda]-Kintone-AQI

## Evaluation Criteria:

- **Functionality**: Correct implementation of CRUD operations.
- **Code Quality**: Clean, well-structured, and maintainable code.
- **User Experience**: Intuitive and user-friendly interface.
- **Problem-Solving**: Ability to handle edge cases and errors.
- **Framework/Library Usage**: Effective use of chosen technology, including state management.

---

## Topic: Employee Database CRUD

### Table Structure (Employee):

| Field Name     | Description                           | Type    |
| -------------- | ------------------------------------- | ------- |
| NIP            | Nomer Induk Pegawai – id, primary key | String  |
| First name     | Employee first name                   | String  |
| Last name      | Employee last name                    | String  |
| Address        | Employee address                      | String  |
| Position       | Employee position                     | String  |
| Salary         | Employee salary                       | Integer |
| Division       | Employee division                     | String  |
| Working Status | Employee working status               | String  |
| Birthday       | Employee birthday                     | Date    |
| Join Date      | Employee join date                    | Date    |

### JSON Example:

```json
{
  "employees": [
    {
      "Nip": "12345",
      "First name": "Budi",
      "Last name": "Buda",
      "Address": "Jalan Wahid hasyim no 8",
      "Position": "Javascript Developer",
      "Salary": "11.000.000",
      "Division": "Kintone",
      "Birthdate": "03/12/1997",
      "Join Date": "13/11/2024"
    }
  ]
}
```

---

## Page Structure/Layout

### Form Create:

- Displayed in separate page.
- **Autogenerate** NIP: Format should be `AQI-[joinDate (ddmmyyyy)]-[auto-increment]`
  - Example: `AQI-13112024-001`, `AQI-03012025-002`

### Form Update:

- Displayed in a separate page with auto-populated data.
- Disable the **NIP** field and **Join Date** field (non-editable).

### Detail Page:

- **Features**:
  - Button to update (redirect to form update).
  - Button to delete (delete from JSON).

### Index Page:

- **Features**:

  - Table displaying data from the API (read).
  - Filter section to filter the data.
  - Action buttons to update/delete rows.

## GoodLuck! 🍀
