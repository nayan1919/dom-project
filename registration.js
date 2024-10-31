var selectedRow = null;

// Function to save students to localStorage
function saveToLocalStorage(data) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const existingIndex = students.findIndex(student => student.studentId === data.studentId);

    if (existingIndex >= 0) {
        students[existingIndex] = data; // Update existing student
    } else {
        students.push(data); // Add new student
    }
    localStorage.setItem('students', JSON.stringify(students)); // Save updated list
}

// Function to load students from localStorage
function loadStudentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

// Function to handle form submission
function onFormSubmit(e) {
    e.preventDefault();  
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewData(formData);
    } else {
        updateRow(formData);
    }
    resetForm();
    loadDataToTable(); // Refresh the table after submitting
}

// Retrieving the data
function readFormData() {
    var formData = {};
    formData["studentName"] = document.getElementById("studentName").value;
    formData["studentId"] = document.getElementById("studentId").value;
    formData["email"] = document.getElementById("email").value;
    formData["contactNo"] = document.getElementById("contactNo").value;
    formData["address"] = document.getElementById("address").value;
    return formData; 
}

// Insert the data
function insertNewData(data) {
    var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    
    var cellStyle = 'text-align: center; padding: 10px; border: 1px solid white; font-weight: normal; font-size: 16px; background-color: white;'; 

    newRow.insertCell(0).innerHTML = data.studentName;
    newRow.cells[0].setAttribute("style", cellStyle);
   
    newRow.insertCell(1).innerHTML = data.studentId;
    newRow.cells[1].setAttribute("style", cellStyle);
   
    newRow.insertCell(2).innerHTML = data.email;
    newRow.cells[2].setAttribute("style", cellStyle);
   
    newRow.insertCell(3).innerHTML = data.contactNo;
    newRow.cells[3].setAttribute("style", cellStyle);
   
    newRow.insertCell(4).innerHTML = data.address;
    newRow.cells[4].setAttribute("style", cellStyle);

    newRow.insertCell(5).innerHTML = `<button onclick="editRow(this)" class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none mr-2"> Edit </button>
    <button onclick="deleteRow(this)" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"> Delete </button>`;
    newRow.cells[5].setAttribute("style", cellStyle);

    saveToLocalStorage(data); // Save data to local storage after insertion
}

// Edit the data
function editRow(button) {
    var row = button.parentNode.parentNode; // Access the row
    
    // Retrieve data from the row
    var studentName = row.cells[0].innerHTML;
    var studentId = row.cells[1].innerHTML;
    var email = row.cells[2].innerHTML;
    var contactNo = row.cells[3].innerHTML;
    var address = row.cells[4].innerHTML;

    document.getElementById("studentName").value = studentName;
    document.getElementById("studentId").value = studentId;
    document.getElementById("email").value = email;
    document.getElementById("contactNo").value = contactNo;
    document.getElementById("address").value = address;
    selectedRow = row; 
}

// Update the row
function updateRow(data) {
    selectedRow.cells[0].innerHTML = data.studentName;
    selectedRow.cells[1].innerHTML = data.studentId;
    selectedRow.cells[2].innerHTML = data.email;
    selectedRow.cells[3].innerHTML = data.contactNo;
    selectedRow.cells[4].innerHTML = data.address;
    
    // Save updated data to local storage
    saveToLocalStorage(data); 
    selectedRow = null; // Clear selectedRow variable after updating
}

// Delete the data
function deleteRow(td) {
    if (confirm('Do you want to delete this record?')) {
        var row = td.parentElement.parentElement; // Get the row to be deleted
        var students = loadStudentsFromLocalStorage(); // Load existing students
        const studentId = row.cells[1].innerHTML; // Get the Student ID of the row to delete
        const updatedStudents = students.filter(student => student.studentId !== studentId); // Remove the student from the array
        localStorage.setItem('students', JSON.stringify(updatedStudents)); // Save updated list
        document.getElementById('studentlist').deleteRow(row.rowIndex); // Delete the row from the table
    }
}

// Reset the data
function resetForm() {
    document.getElementById("studentName").value = '';
    document.getElementById("studentId").value = '';
    document.getElementById("email").value = '';
    document.getElementById("contactNo").value = '';
    document.getElementById("address").value = '';
    selectedRow = null; // Clear selected row
}

// Load data into the table on page load
function loadDataToTable() {
    const students = loadStudentsFromLocalStorage(); // Load students from local storage
    const tableBody = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing table data

    students.forEach(student => {
        const newRow = tableBody.insertRow();
        Object.values(student).forEach(value => {
            const cell = newRow.insertCell();
            cell.textContent = value;
            cell.setAttribute("style", 'text-align: center; padding: 10px; border: 1px solid white; font-weight: 500; font-size: 16px; background-color: white;');
        });
        const actionsCell = newRow.insertCell();
        actionsCell.innerHTML = `<button onclick="editRow(this)" class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none mr-2"> Edit </button>
        <button onclick="deleteRow(this)" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"> Delete </button>`;
        actionsCell.setAttribute("style", 'text-align: center; padding: 10px; border: 1px solid white; font-weight: bold; font-size: 21px; background-color: white;');
    });
}

// Initial data load on page load
window.onload = loadDataToTable;
