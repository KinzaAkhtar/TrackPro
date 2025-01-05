import React, { useState, useCallback } from "react";
import { TextField, Button, Grid, Typography, LinearProgress } from "@mui/material";
import axios from "axios";

// Step1 component wrapped with React.memo to prevent unnecessary re-renders
const Step1 = React.memo(({ formData, handleInputChange }) => (
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
          onChange={(e) =>
            handleInputChange("personalInfo", "fullName", e.target.value)
          }
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
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.personalInfo.dob}
          onChange={(e) =>
            handleInputChange("personalInfo", "dob", e.target.value)
          }
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
          value={formData.personalInfo.gender}
          onChange={(e) =>
            handleInputChange("personalInfo", "gender", e.target.value)
          }
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
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
          onChange={(e) =>
            handleInputChange("personalInfo", "phone", e.target.value)
          }
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
          onChange={(e) =>
            handleInputChange("personalInfo", "email", e.target.value)
          }
        />
      </Grid>
    </Grid>
  </div>
));

// Step2 component wrapped with React.memo to prevent unnecessary re-renders
const Step2 = React.memo(({ formData, handleInputChange }) => (
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
          onChange={(e) =>
            handleInputChange("employmentDetails", "employeeID", e.target.value)
          }
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
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.employmentDetails.doj}
          onChange={(e) =>
            handleInputChange("personalInfo", "doj", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Department"
          variant="outlined"
          name="dept"
          fullWidth
          required
          value={formData.employmentDetails.department}
          onChange={(e) =>
            handleInputChange("employmentDetails", "department", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Designation"
          variant="outlined"
          name="designation"
          fullWidth
          required
          value={formData.employmentDetails.designation}
          onChange={(e) =>
            handleInputChange("employmentDetails", "designation", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shift Hours"
          variant="outlined"
          name="shiftHours"
          type="number"
          fullWidth
          required
          value={formData.employmentDetails.shiftHours}
          onChange={(e) =>
            handleInputChange("employmentDetails", "shiftHours", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Salary"
          type="number"
          name="salary"
          variant="outlined"
          fullWidth
          value={formData.compensation.salary}
          onChange={(e) =>
            handleInputChange("compensation", "salary", e.target.value)
          }
        />
      </Grid>
    </Grid>
  </div>
));

// Step3 component wrapped with React.memo to prevent unnecessary re-renders
const Step3 = React.memo(({ formData, handleInputChange, handleFileChange }) => (
  <div>
    <Typography variant="h6" gutterBottom>Step 3: Portal Login</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="outlined" component="label" sx={{ borderColor: 'red', color: 'red' }}>
          Upload CV
          <input
            type="file"
            name="cv"
            hidden
            onChange={(e) =>
              //handleInputChange("performance", "cv", e.target.files[0])
              handleFileChange("files", "cv", e.target.files[0])
            }
          />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" component="label" sx={{ borderColor: 'red', color: 'red' }}>
          Upload Photo
          <input
            type="file"
            name="dp"
            hidden
            onChange={(e) =>
              //handleInputChange("performance", "dp", e.target.files[0])
              handleFileChange("files", "dp", e.target.files[0])
            }
          />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Work Email"
          variant="outlined"
          name="workemail"
          fullWidth
          required
          value={formData.portalLogin.workEmail}
          onChange={(e) =>
            handleInputChange("portalLogin", "workEmail", e.target.value)
          }
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
          onChange={(e) =>
            handleInputChange("portalLogin", "password", e.target.value)
          }
        />
      </Grid>
    </Grid>
  </div>
));

const EmployeeForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
    },
    employmentDetails: {
      employeeID: "",
      department: "",
      designation: "",
    },
    portalLogin: {
      workEmail: "",
      password: "",
    },
    compensation: {
      salary: "",
    },
    files: {
      cv: null,
      photo: null,
    },
  });

  // Handle input changes with useCallback to prevent unnecessary re-renders
  const handleInputChange = useCallback((section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  }, []);

    // Handle file input change
    const handleFileChange = (section, field, file) => {
      setFormData((prevData) => ({
        ...prevData,
        files: {
          ...prevData.files,
          [field]: file,
        },
      }));
    };


    // Handle form submission (step 3 - Submit the data)
  const handleSubmit = async () => {
    // Validate before submission
    if (step === 3) {
      const { fullName, dob, gender, phone, email } = formData.personalInfo;
      const { employeeID, department, designation } = formData.employmentDetails;
      const { workEmail, password } = formData.portalLogin;

      if (!fullName || !dob || !gender || !phone || !email || !employeeID || !department || !designation || !workEmail || !password) {
        alert("Please fill in all the fields.");
        return;
      }

      // Prepare data for submission
      const submissionData = new FormData();
      
      // Append personal info
      Object.keys(formData.personalInfo).forEach(key => {
        submissionData.append(`personalInfo[${key}]`, formData.personalInfo[key]);
      });

      // Append employment details
      Object.keys(formData.employmentDetails).forEach(key => {
        submissionData.append(`employmentDetails[${key}]`, formData.employmentDetails[key]);
      });

      // Append portal login details
      Object.keys(formData.portalLogin).forEach(key => {
        submissionData.append(`portalLogin[${key}]`, formData.portalLogin[key]);
      });

      // Append compensation details
      submissionData.append("compensation[salary]", formData.compensation.salary);

      // Append files (cv and photo)
      submissionData.append("files[cv]", formData.files.cv);
      submissionData.append("files[photo]", formData.files.photo);

      // Send the data to the API
      try {
        const response = await axios.post('/api/v1/admin/addemployee', submissionData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Optionally include Authorization header if needed
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          alert("Form submitted successfully!");
          Navigate("/admin-dashboard/employee");
        } else {
          alert("Something went wrong, please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("There was an error submitting the form.");
      }
    }
  };

  // Handle next step logic with validation
  const handleNext = () => {
    if (step === 1) {
      const { fullName, dob, gender, phone, email } = formData.personalInfo;
      if (!fullName || !dob || !gender || !phone || !email) {
        alert("Please fill in all the fields in Step 1.");
        return;
      }
    } else if (step === 2) {
      const { employeeID, department, designation } = formData.employmentDetails;
      if (!employeeID || !department || !designation) {
        alert("Please fill in all the fields in Step 2.");
        return;
      }
    } else if (step === 3) {
      const { workEmail, password } = formData.portalLogin;
      if (!workEmail || !password) {
        alert("Please fill in all the fields in Step 3.");
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Typography variant="h5" gutterBottom>
        Employee Form
      </Typography>
      <LinearProgress variant="determinate" value={(step / 3) * 100} sx={{ mb: 3 }} />

      {step === 1 && <Step1 formData={formData} handleInputChange={handleInputChange} />}
      {step === 2 && <Step2 formData={formData} handleInputChange={handleInputChange} />}
      {step === 3 && <Step3 formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} />}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <Button
            variant="contained"
            onClick={handlePrev}
            sx={{ backgroundColor: "red", color: "white" }}
          >
            Previous
          </Button>
        )}
        {step < 3 && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ backgroundColor: "red", color: "white" }}
          >
            Next
          </Button>
        )}
        {step === 3 && (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
