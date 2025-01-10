import React, { useState, useMemo } from 'react';
import axios from 'axios'; // Ensure you install axios: npm install axios
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns'; // To format the date for display
import { useNavigate } from "react-router-dom";
import { WebStories } from '@mui/icons-material';



// Dummy Data for Departments and Team Leads
const departments = ['EBook', 'Marketing', 'ContentWriting', 'WebDevelopment', 'Design', 'Publication', 'Outsourcing', 'Video'];
const TaskType= {
  EBook: ['Editing/ProofReading', 'Ghost Writing'],
  Marketing: ['Post', 'SEO', 'SMM Calendar'],
  ContentWriting: ['SMM content','Articles','Press release','Blog','Web content'],
  WebDevelopment: ['Website', 'Web Application', 'Mobile Application' ],
  Design: ['Illustrations', 'Cover' , 'formatting' , 'SMP'],
  Publication: ['Book Publication', 'Article Publication'],
  Outsourcing: ['Domain hosting SSL','Printing','Copyright/Isbn','Cameo video','Magzine article','Audio book','translation'],
  Video: ['Book Trailer', 'Video Trailer', 'Video Book Animation'],
};

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTaskType, setSelectedTaskType] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [navigateAfterSnackbar, setNavigateAfterSnackbar] = useState(false);

  // Handle file attachment change
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  // Memoized team lead options based on selected department
  const taskTypeOptions = useMemo(() => TaskType[selectedDepartment] || [], [selectedDepartment]);

  // Validation function to check if the required fields are filled
  const validateForm = () => {
    const newErrors = {};
    if (!taskTitle) newErrors.taskTitle = 'Task Title is required';
    if (!taskDescription) newErrors.taskDescription = 'Task Description is required';
    if (!selectedDepartment) newErrors.selectedDepartment = 'Department is required';
    if (!selectedTaskType) newErrors.selectedTaskType = 'Task Type is required';
    if (!selectedPriority) newErrors.selectedPriority = 'Priority is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();  // Validate the form first
    setErrors(formErrors);  // Update error state
    if (Object.keys(formErrors).length > 0) return;  // Stop if there are validation errors
  
    // Set loading state after validation passes
    setLoading(true);
  
    // Prepare form data
    const formData = new FormData();
    formData.append('taskTitle', taskTitle);
    formData.append('taskDescription', taskDescription);
    formData.append('selectedDepartment', selectedDepartment);
    formData.append('selectedTaskType', selectedTaskType);
    formData.append('deadline', deadline);
    formData.append('priority', selectedPriority);
    if (attachment) formData.append('attachment', attachment);
  
    try {
      const response = await axios.post('/api/v1/admin/createticket', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setSnackbarMessage("Task created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setNavigateAfterSnackbar(true);  // Set flag to navigate after snackbar closes
      } else {
        setSnackbarMessage("Something went wrong, please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("There was an error creating the Task.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        // Update the state based on the name of the input field
        if (name === 'taskTitle') {
          setTaskTitle(value);
        } else if (name === 'taskDescription') {
          setTaskDescription(value);
        } else if (name === 'selectedDepartment') {
          setSelectedDepartment(value);
        } else if (name === 'selectedTaskType') {
          setSelectedTaskType(value);
        } else if (name === 'selectedPriority') {
          setSelectedPriority(value);
        }
      
        // Clear errors when the user starts typing in the respective field
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',  // Clear error for the specific field being typed in
        }));
        
        // Effect to navigate after snackbar is closed
        React.useEffect(() => {
          if (navigateAfterSnackbar && !snackbarOpen) {
            navigate("/admin-dashboard/tasks");
          }
        }, [snackbarOpen, navigateAfterSnackbar, navigate]);
      };
      

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full p-8 border border-gray-300 rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-8 text-center text-black">Create Task</h2>
        
        {/* First row: Task Title */}
        <div className='mb-6'>
            <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            name="taskTitle"
            value={taskTitle}
            onChange={handleInputChange}
            error={!!errors.taskTitle}
            helperText={errors.taskTitle}
            />
        </div>
        
        {/* Second row: Task Description */}
        <div>
            <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            name="taskDescription"
            value={taskDescription}
            onChange={handleInputChange}
            multiline
            rows={4}
            error={!!errors.taskDescription}
            helperText={errors.taskDescription}
            />
        </div>
        
        {/* Third row: Department and Team Lead (adjacent) */}
        <div className="grid grid-cols-2 gap-6 mb-6 mt-6">
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              name="selectedDepartment"
              value={selectedDepartment}
              onChange={handleInputChange}
              error={!!errors.selectedDepartment}
            >
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
            {errors.selectedDepartment && <p className="text-red-500 text-sm">{errors.selectedDepartment}</p>}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Task Type</InputLabel>
            <Select
              label="Task Type"
              name="selectedTaskType"
              value={selectedTaskType}
              onChange={handleInputChange}
              disabled={!selectedDepartment}
              error={!!errors.selectedTaskType}
            >
              {taskTypeOptions.map((tasktype) => (
                <MenuItem key={tasktype} value={tasktype}>
                  {tasktype}
                </MenuItem>
              ))}
            </Select>
            {errors.selectedTaskType && <p className="text-red-500 text-sm">{errors.selectedTaskType}</p>}
          </FormControl>
        </div>

        {/* Fourth row: Label and Deadline (adjacent) */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              name="selectedPriority"
              value={selectedPriority}
              onChange={handleInputChange}
            >
              <MenuItem value="lowPriority">Low Priority</MenuItem>
              <MenuItem value="mediumPriority">Medium Priority</MenuItem>
              <MenuItem value="highPriority">High Priority</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={(newDeadline) => setDeadline(newDeadline)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  helperText={deadline ? `Selected date: ${format(deadline, 'MM/dd/yyyy')}` : "Select a deadline"} 
                />
              )}
            />
          </LocalizationProvider>
        </div>

        {/* Fifth row: Attachments */}
        <div className="mb-6">
          <label className="block text-lg mb-2">Add Attachments</label>
          <input
            type="file"
            className="p-2 border border-dashed border-gray-300 rounded-lg w-full"
            onChange={handleFileChange}
            accept=".jpg,.png,.pdf,.docx"
          />
        </div>

        {/* create task button */}
        <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
                backgroundColor: "rgb(239, 68, 68)",
                color: "white",
            }}
        >
        {loading ? "Creating..." : "Create Task"}
        </Button>
      </div>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={null}  // Disable auto-hide
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </div>
  );
};

export default TaskForm;
