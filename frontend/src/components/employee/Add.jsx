import React, { useState, useCallback } from "react";
import { TextField, Button, Grid, Typography, LinearProgress, Snackbar, Alert, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";

const departments = [
  "Ebook",
  "Marketing",
  "Content Writing",
  "Web Development",
  "Design",
  "Publication",
  "Outsourcing",
  "Video"
];

const gender =["Male", "Female", "Prefer Not to Say"]
// Step1 component wrapped with React.memo to prevent unnecessary re-renders
const Step1 = React.memo(({ formData, handleInputChange, errors }) => (
  <div>
    <Typography variant="h6" gutterBottom>Step 1: Personal Information</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Full Name"
          variant="outlined"
          name="fullname"
          fullWidth
          required
          value={formData.personalInfo.fullName}
          onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          name="dob"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.personalInfo.dob}
          onChange={(e) => handleInputChange("personalInfo", "dob", e.target.value)}
          error={!!errors.dob}
          helperText={errors.dob}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Gender"
          variant="outlined"
          name="gender"
          fullWidth
          select
          required
          value={formData.personalInfo.gender || ""}
          onChange={(e) => handleInputChange("personalInfo", "gender", e.target.value)}
          error={!!errors.gender}
          helperText={errors.gender}
        >
          {gender.map((gender) =>(
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone Number"
          variant="outlined"
          name="phoneno"
          fullWidth
          required
          value={formData.personalInfo.phone}
          onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          fullWidth
          required
          value={formData.personalInfo.email}
          onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
    </Grid>
  </div>
));

// Step2 component wrapped with React.memo to prevent unnecessary re-renders
const Step2 = React.memo(({ formData, handleInputChange, errors }) => (
  <div>
    <Typography variant="h6" gutterBottom>Step 2: Employment Details</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Employee ID"
          variant="outlined"
          name="id"
          fullWidth
          required
          value={formData.employmentDetails.employeeID}
          onChange={(e) => handleInputChange("employmentDetails", "employeeID", e.target.value)}
          error={!!errors.employeeID}
          helperText={errors.employeeID}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Date of Joining"
          type="date"
          variant="outlined"
          name="doj"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.employmentDetails.doj}
          onChange={(e) => handleInputChange("employmentDetails", "doj", e.target.value)}
          error={!!errors.doj}
          helperText={errors.doj}
        />
      </Grid>
      <Grid item xs={12}>
          <TextField
            label="Department"
            variant="outlined"
            name="dept"
            fullWidth
            required
            select
            value={formData.employmentDetails.department || ""}  // Ensure department value is an empty string if not selected
            onChange={(e) => handleInputChange("employmentDetails", "department", e.target.value)}
            error={!!errors.department}
            helperText={errors.department}
          >
            {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      <Grid item xs={12}>
        <TextField
          label="Designation"
          variant="outlined"
          name="designation"
          fullWidth
          required
          value={formData.employmentDetails.designation}
          onChange={(e) => handleInputChange("employmentDetails", "designation", e.target.value)}
          error={!!errors.designation}
          helperText={errors.designation}
        />
      </Grid>
      <Grid container spacing={1} marginTop={"5px"}>
        <Grid item xs={6}>
          <TextField
            label="Clock-In"
            variant="outlined"
            name="checkInTime"
            type="Time"
            fullWidth
            required
            value={formData.employmentDetails.checkInTime}
            onChange={(e) => handleInputChange("employmentDetails", "checkInTime", e.target.value)}
            error={!!errors.checkInTime}
            helperText={errors.checkInTime}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Clock-Out"
            variant="outlined"
            name="checkOutTime"
            type="Time"
            fullWidth
            required
            value={formData.employmentDetails.checkOutTime}
            onChange={(e) => handleInputChange("employmentDetails", "checkOutTime", e.target.value)}
            error={!!errors.checkOutTime}
            helperText={errors.checkOutTime}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Salary"
          type="number"
          name="salary"
          required
          variant="outlined"
          fullWidth
          value={formData.compensation.salary}
          onChange={(e) => handleInputChange("compensation", "salary", e.target.value)}
          error={!!errors.salary}
          helperText={errors.salary}
        />
      </Grid>
    </Grid>
  </div>
));

// Step3 component wrapped with React.memo to prevent unnecessary re-renders
const Step3 = React.memo(({ formData, handleInputChange, handleFileChange, errors }) => (
  <div>
    <Typography variant="h6" gutterBottom>Step 3: Portal Login</Typography>
    <Grid container spacing={2}>
      {/* Upload CV Section */}
      <Grid item xs={12}>
        <Button variant="outlined" component="label" sx={{ borderColor: 'rgb(239, 68, 68)', color: 'rgb(239, 68, 68)' }}>
          Upload CV
          <input
            type="file"
            name="cv"
            hidden
            onChange={(e) => handleFileChange("files", "cv", e.target.files[0])}
          />
        </Button>
        {formData.files.cv && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
            {formData.files.cv.type.includes('image') ? (
              <img
                src={URL.createObjectURL(formData.files.cv)}
                alt="Uploaded CV Thumbnail"
                style={{ width: 50, height: 50, borderRadius: 5, objectFit: 'cover', marginRight: 10 }}
              />
            ) : (
              <img
                src="https://via.placeholder.com/50"
                alt="Uploaded CV Thumbnail"
                style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
              />
            )}
            <Typography
              variant="body2"
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '5px 10px',
                borderRadius: 5,
                marginRight: 2,
                wordBreak: 'break-word',
                maxWidth: '150px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {formData.files.cv.name}
            </Typography>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleFileChange("files", "cv", null)}
              sx={{ backgroundColor: 'red', color: 'white' }}
            >
              <Clear />
            </IconButton>
          </div>
        )}
      </Grid>

      {/* Upload Photo Section */}
      <Grid item xs={12}>
        <Button variant="outlined" component="label" sx={{ borderColor: 'rgb(239, 68, 68)', color: 'rgb(239, 68, 68)' }}>
          Upload Photo
          <input
            type="file"
            name="dp"
            hidden
            onChange={(e) => handleFileChange("files", "photo", e.target.files[0])}
          />
        </Button>
        {formData.files.photo && (
          <div style={{ marginTop: 10, textAlign: 'center' }}>
            <img
              src={URL.createObjectURL(formData.files.photo)}
              alt="Uploaded Profile"
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 10 }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: '5px 10px',
                  borderRadius: 5,
                  marginRight: 2,
                  wordBreak: 'break-word',
                  maxWidth: '150px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {formData.files.photo.name}
              </Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleFileChange("files", "photo", null)}
                sx={{ backgroundColor: 'red', color: 'white' }}
              >
                <Clear />
              </IconButton>
            </div>
          </div>
        )}
      </Grid>

      {/* Work Email and Password Fields */}
      <Grid item xs={12}>
        <TextField
          label="Work Email"
          variant="outlined"
          name="workemail"
          fullWidth
          required
          value={formData.portalLogin.workEmail}
          onChange={(e) => handleInputChange("portalLogin", "workEmail", e.target.value)}
          error={!!errors.workEmail}
          helperText={errors.workEmail}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={formData.portalLogin.password}
          onChange={(e) => handleInputChange("portalLogin", "password", e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Grid>
    </Grid>
  </div>
));

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: { fullName: "", dob: "", gender: "", phone: "", email: "" },
    employmentDetails: { employeeID: "", department: "", designation: "", doj: "", checkInTime: "", checkOutTime: "" },
    portalLogin: { workEmail: "", password: "" },
    compensation: { salary: "" },
    files: { cv: null, photo: null },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [navigateAfterSnackbar, setNavigateAfterSnackbar] = useState(false); // New state to handle delayed navigation

  const handleInputChange = useCallback((section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  }, []);

  const handleFileChange = (section, field, file) => {
    setFormData((prevData) => ({
      ...prevData,
      files: {
        ...prevData.files,
        [field]: file,
      },
    }));
  };

  const validate = () => {
    let tempErrors = {};
    const { fullName, dob, gender, phone, email } = formData.personalInfo;
    const { employeeID, department, doj, designation, checkInTime, checkOutTime } = formData.employmentDetails;
    const { workEmail, password } = formData.portalLogin;
    const { salary } = formData.compensation;

    if (step === 1) {
      if (!fullName) tempErrors.fullName = "Full Name is required";
      if (!dob) tempErrors.dob = "Date of Birth is required";
      if (!gender) tempErrors.gender = "Gender is required";
      if (!phone) tempErrors.phone = "Phone Number is required";
      if (!email) tempErrors.email = "Email is required";
    }

    if (step === 2) {
      if (!employeeID) tempErrors.employeeID = "Employee ID is required";
      if (!department) tempErrors.department = "Department is required";
      if (!doj) tempErrors.doj = "Date of joining is required"
      if (!designation) tempErrors.designation = "Designation is required";
      if (!checkInTime) tempErrors.checkInTime = "Clock In Time is required";
      if (!checkOutTime) tempErrors.checkOutTime = "Clock Out Time is required";
      if (!salary) tempErrors.salary = "Salary is required"
    }

    if (step === 3) {
      if (!workEmail) tempErrors.workEmail = "Work Email is required";
      if (!password) tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return; // Validate and stop if errors exist
    setLoading(true);

    const submissionData = new FormData();
    Object.keys(formData.personalInfo).forEach(key => {
      submissionData.append(`personalInfo[${key}]`, formData.personalInfo[key]);
    });
    Object.keys(formData.employmentDetails).forEach(key => {
      submissionData.append(`employmentDetails[${key}]`, formData.employmentDetails[key]);
    });
    Object.keys(formData.portalLogin).forEach(key => {
      submissionData.append(`portalLogin[${key}]`, formData.portalLogin[key]);
    });
    submissionData.append("compensation[salary]", formData.compensation.salary);
    submissionData.append("files[cv]", formData.files.cv);
    submissionData.append("files[photo]", formData.files.photo);

    try {
      const response = await axios.post('/api/v1/admin/addemployee', submissionData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setSnackbarMessage("Employee created successfully!");
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
      setSnackbarMessage("There was an error submitting the form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (validate()) {
      if (step < 3) {
        setStep(step + 1);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Effect to navigate after snackbar is closed
  React.useEffect(() => {
    if (navigateAfterSnackbar && !snackbarOpen) {
      navigate("/admin-dashboard/employee");
    }
  }, [snackbarOpen, navigateAfterSnackbar, navigate]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Typography variant="h5" gutterBottom>Employee Form</Typography>
      <LinearProgress variant="determinate" value={(step / 3) * 100} sx={{ mb: 3 }} />

      {step === 1 && <Step1 formData={formData} handleInputChange={handleInputChange} errors={errors} />}
      {step === 2 && <Step2 formData={formData} handleInputChange={handleInputChange} errors={errors} />}
      {step === 3 && <Step3 formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} errors={errors} />}

      <div className="mt-6 flex justify-between">
        {step > 1 && <Button variant="contained" onClick={handlePrev} sx={{ backgroundColor: "rgb(239, 68, 68)", color: "white" }}>Previous</Button>}
        {step < 3 && <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: "rgb(239, 68, 68)", color: "white" }}>Next</Button>}
        {step === 3 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              backgroundColor: "rgb(239, 68, 68)",
              color: "white",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        )}
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

export default EmployeeForm;