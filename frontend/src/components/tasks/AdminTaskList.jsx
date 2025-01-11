import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, MenuItem, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Delete as DeleteIcon, Visibility as VisibilityIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const tasksData = [
  {
    id: 1,
    taskTitle: 'Fix Bug in Homepage',
    taskDescription: 'Fix the responsive issue on the homepage',
    department: 'Video',
    taskType: 'Book Trailer',
    priority: 'High Priority',
    deadline: '2025-01-15',
  },
  {
    id: 2,
    taskTitle: 'Update Marketing Plan',
    taskDescription: 'Update the marketing plan for Q1',
    department: 'Marketing',
    taskType: 'Post',
    priority: 'Low Priority',
    deadline: '2025-01-20',
  },
  // More tasks can be added here
];

const TaskList = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    // Delete task logic: Remove the task from the state
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
    handleCloseMenu();
    setOpenDialog(false);
  };

  const handleView = () => {
    // Navigate to the view task details page, passing the task id in the URL
    navigate(`/admin-dashboard/view-task/${selectedTask.id}`);
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
              <TableCell className="py-3 px-6 text-left font-medium">Deadline</TableCell>
              <TableCell className="py-3 px-6 text-left font-medium">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-gray-50 transition duration-200">
                <TableCell className="py-3 px-6" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {task.taskTitle}
                </TableCell>
                <TableCell className="py-3 px-6" style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {task.taskDescription}
                </TableCell>
                <TableCell className="py-3 px-6">{task.department}</TableCell>
                <TableCell className="py-3 px-6">{task.taskType}</TableCell>
                <TableCell className="py-3 px-6">
                  <span className={`px-3 py-1 rounded-full text-white ${task.priority === 'High Priority' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-6">{task.deadline}</TableCell>
                <TableCell className="py-3 px-6">
                  <IconButton onClick={(e) => handleMenuClick(e, task)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu for Delete and View options */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogContent>
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteDialog}
            style={{
              backgroundColor: '#d3d3d3', 
              opacity: 0.6, 
              color: '#000',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            style={{
              backgroundColor: 'rgb(239, 68, 68)', 
              color: 'white',
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
