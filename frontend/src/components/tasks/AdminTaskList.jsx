import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, MenuItem, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  // Fetching tasks from the API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/v1/admin/gettasks");
        console.log("Fetched Tasks:", response.data);
        setTasks(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleDelete = async () => {
    try {
      // Send a POST request to delete the selected task using selectedTask.id
      await axios.post('/api/v1/admin/deleteTask', { taskId: selectedTask._id });

      // Update the state to remove the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== selectedTask._id));

      // Close the menu and dialog
      handleCloseMenu();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error deleting task:', error.response?.data?.message || error.message);
    }
  };

  const handleView = () => {
    navigate(`/admin-dashboard/view-task/${selectedTask._id}`);
    handleCloseMenu();
  };

  const openDeleteDialog = () => {
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="p-6">
      {/* Heading section */}
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Task List</h2>
      </div>

      {/* Create Task Button, right-aligned */}
      <div className="flex justify-end mt-4">
        <Link to="/admin-dashboard/create-task"
          className="px-6 py-2 bg-red-500 hover:bg-red-700 rounded-lg text-white font-medium shadow-md transition duration-200">
          Create Task
        </Link>
      </div>

      {/* Task Table */}
      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden mt-6">
        <Table className="min-w-full">
          <TableHead>
            <TableRow className="bg-gray-100 text-gray-600">
              <TableCell className="py-3 px-6 text-left font-medium">Task Title</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Task Description</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Department</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Task Type</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Priority</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Status</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Deadline</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task._id} className="hover:bg-gray-50 transition duration-200">
                  <TableCell className="py-3 px-6" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.title}
                  </TableCell>
                  <TableCell className="py-3 px-6" style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.description}
                  </TableCell>
                  <TableCell className="py-3 px-6">{task.department}</TableCell>
                  <TableCell className="py-3 px-6">{task.tasktype}</TableCell>
                  <TableCell className="py-3 px-6">
                    <span className={`px-3 py-1 rounded-full text-white ${task.priority === 'High Priority' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                      {task.priority}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${task.status === 'TODO'
                        ? 'bg-red-500'
                        : task.status === 'in progress'
                          ? 'bg-yellow-500'
                          : task.status === 'completed'
                            ? 'bg-blue-500'
                            : task.status === 'evaluated'
                              ? 'bg-green-500'
                              : ''
                        }`}
                    >
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-6">{task.deadline}</TableCell>
                  <TableCell className="py-3 px-6">
                    <IconButton onClick={(e) => handleMenuClick(e, task)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={handleView}>
                        <VisibilityIcon style={{ marginRight: 8 }} />
                        View
                      </MenuItem>
                      <MenuItem onClick={openDeleteDialog} style={{ color: 'red' }}>
                        <DeleteIcon style={{ marginRight: 8 }} />
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogContent>
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} style={{ backgroundColor: '#d3d3d3', opacity: 0.6, color: '#000' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} style={{ backgroundColor: 'rgb(239, 68, 68)', color: 'white' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
