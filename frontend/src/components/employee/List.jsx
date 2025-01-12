import React, { useState, useEffect } from "react";
import { Link,useOutletContext  } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import axios from "axios"; // Ensure axios is imported
import EditEmployee from "./EditEmployee";
import {
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const List = () => {
  const { setEmployeeCount } = useOutletContext(); // Access the context
  const [employees, setEmployees] = useState([]); // Initialize with an empty array
  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For managing the dropdown menu
  const [loading, setLoading] = useState(true); // For tracking loading state

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/v1/admin/getemployees");
        console.log("Fetched Employees:", response.data);
        
        const fetchedEmployees = response.data.data || [];
        setEmployees(fetchedEmployees);
        console.log('setEmployeeCount:', setEmployeeCount);

        // Update employee count after data is fetched
        if (setEmployeeCount) {
          setEmployeeCount(fetchedEmployees.length);
          console.log("Employee count updated in List:", fetchedEmployees.length);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
      }
    };
  
    fetchEmployees();
  }, [setEmployeeCount]);  // Dependencies remain the same
  
  
   

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenuClick = (event, rowId) => {
    setAnchorEl({ [rowId]: event.currentTarget });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenDrawer(true);
  };

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

  const handleDelete = async () => {
    if (selectedEmployee) {
      try {
        // Send a POST request to delete the employee
        await axios.post('/api/v1/admin/deleteEmployee', { userId: selectedEmployee._id });

        // Update the state to remove the employee from the list
        setEmployees(employees.filter((employee) => employee._id !== selectedEmployee._id));

        // Close the delete dialog and show success snackbar
        closeDeleteDialog();
        setOpenSnackbar(true);
      } catch (error) {
        console.error('Error deleting employee:', error);
        // Optionally, you can display an error snackbar or message
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Employees List</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-red-500 hover:bg-red-700 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      {loading ? (
        <div className="text-center">Loading employees...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Work Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.ID}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>{row.workemail}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.phoneno}</TableCell>
                  <TableCell>{row.salary}</TableCell>
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
                        to={`/admin-dashboard/view-employee/${row._id}`}
                        onClick={handleMenuClose}
                      >
                        <FaEye className="mr-2" /> View
                      </MenuItem>
                      <MenuItem onClick={() => handleEdit(row)}>
                        <FaPen className="mr-2" /> Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => openDeleteDialog(row)}
                        style={{ color: 'red' }}
                      >
                        <FaTrash className="mr-2" /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          style: { width: "400px", backgroundColor: "#f9fafb" },
        }}
      >
        {selectedEmployee && (
          <EditEmployee
            employee={selectedEmployee}
            onClose={() => setOpenDrawer(false)}
            onSave={handleSaveEdit}
          />
        )}
      </Drawer>

      <Dialog open={openDialog} onClose={closeDeleteDialog}>
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
      />
    </div>
  );
};

export default List;
