import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import TaskList from "./TLTaskList";
// import EditEmployee from "./EditEmployee";
// import ViewEmployee from "./ViewEmployee";
import { Drawer, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TeamList = () => {
  const mockEmployees = [
    { _id: "1", fullname: "John Doe", designation: "Software Engineer", workEmail: "ali@trackpro.com", dept: "Engineering", phoneNo: "03232566196" },
    { _id: "2", fullname: "Jane Smith", designation: "Product Manager", workEmail: "ali@trackpro.com", dept: "Product", phoneNo: "03232566196" },
    { _id: "3", fullname: "John Doe", designation: "Software Engineer", workEmail: "ali@trackpro.com", dept: "Engineering", phoneNo: "03232566196" },
    { _id: "4", fullname: "Jane Smith", designation: "Product Manager", workEmail: "ali@trackpro.com", dept: "Product", phoneNo: "03232566196" },
    { _id: "5", fullname: "John Doe", designation: "Software Engineer", workEmail: "ali@trackpro.com", dept: "Engineering", phoneNo: "03232566196" },
    { _id: "6", fullname: "Jane Smith", designation: "Product Manager", workEmail: "ali@trackpro.com", dept: "Product", phoneNo: "03232566196" },
  ];

  const [employees, setEmployees] = useState(mockEmployees);
  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For managing the dropdown menu

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenuClick = (event, rowId) => {
    setAnchorEl({ [rowId]: event.currentTarget });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

//   const handleEdit = (employee) => {
//     setSelectedEmployee(employee);
//     setOpenDrawer(true);
//   };

  const handleSaveEdit = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp._id === updatedEmployee._id ? updatedEmployee : emp
      )
    );
    setOpenDrawer(false);
  };

  const openDeleteDialog = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter((employee) => employee._id !== selectedEmployee._id));
      closeDeleteDialog();
      setOpenSnackbar(true); 
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Team Members List</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Name"
          className="px-4 py-0.5 border"
        />
        {/* <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-red-500 hover:bg-red-700 rounded text-white"
        >
          Add New Employee
        </Link> */}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Work Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.workEmail}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell>{row.phoneNo}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuClick(event, row._id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl?.[row._id]}
                    open={Boolean(anchorEl?.[row._id])}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      component={Link}
                      to={`/tl-dashboard/team-management/task-list/${row._id}`}
                      onClick={handleMenuClose}
                    >
                      <FaEye className="mr-2" /> View Tasks
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to={`/tl-dashboard/team-management/track-performance/${row._id}`}
                      onClick={handleMenuClose}
                    >
                      <FaEye className="mr-2" /> Track Performance
                    </MenuItem>
                    {/* <MenuItem
                      onClick={() => handleEdit(row)}
                    >
                      <FaPen className="mr-2" /> Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => openDeleteDialog(row)}
                      style={{ color: 'red' }}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </MenuItem> */}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          style: { width: "400px", backgroundColor: "#f9fafb" },
        }}
      >
        {/* {selectedEmployee && (
          <EditEmployee
            employee={selectedEmployee}
            onClose={() => setOpenDrawer(false)}
            onSave={handleSaveEdit}
          />
        )} */}
      </Drawer>

      {/* <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Are you sure you want to delete this employee?</DialogTitle>
        <DialogContent>
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} style={{ backgroundColor: '#d3d3d3', color: '#000' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} style={{ backgroundColor: 'rgb(239, 68, 68)', color: 'white' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Employee deleted successfully"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ 
          backgroundColor: "rgb(39, 174, 96)", 
          opacity: 0.9, 
          borderRadius: "4px", 
        }}
      /> */}
    </div>
  );
};

export default TeamList;
