import React from "react";
import { Typography, Grid, Paper, Card, CardContent, Box, LinearProgress } from "@mui/material";
import { Person, Work, AttachMoney, CalendarToday } from "@mui/icons-material";

// A reusable component for displaying a profile with a hero section
const EmployeeHero = ({ employee }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          <div className="relative">
            <img
              src={employee?.profilePicture || "/images/default-avatar.jpg"}
              alt="Employee Profile"
              className="w-full h-auto rounded-full border-4 border-gray-300"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h4" gutterBottom>
            {employee?.fullname || "Employee Name"}
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            {employee?.designation || "Employee Designation"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Employee detail page content
const EmployeeDetail = ({ employee }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Typography variant="h5" gutterBottom>
        Employee Details
      </Typography>

      {/* Hero Section */}
      <EmployeeHero employee={employee} />

      {/* Grid Layout for Small Cards */}
      <Grid container spacing={2}>
        {/* Personal Information Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Person sx={{ fontSize: 32, marginRight: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
              </Box>
              <Typography variant="body1">
                <strong>Full Name:</strong> {employee?.fullname || "John Doe"}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {employee?.workEmail || "john.doe@example.com"}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {employee?.phoneNo || "+1 234 567 890"}
              </Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong> {employee?.dob || "1990-01-01"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Employment Information Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Work sx={{ fontSize: 32, marginRight: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Employment Information
                </Typography>
              </Box>
              <Typography variant="body1">
                <strong>Employee ID:</strong> {employee?.employeeID || "12345"}
              </Typography>
              <Typography variant="body1">
                <strong>Department:</strong> {employee?.dept || "Engineering"}
              </Typography>
              <Typography variant="body1">
                <strong>Designation:</strong> {employee?.designation || "Software Engineer"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Compensation and Attendance Information Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <AttachMoney sx={{ fontSize: 32, marginRight: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Compensation & Attendance
                </Typography>
              </Box>
              <Typography variant="body1">
                <strong>Salary:</strong> {employee?.salary || "$60,000"}
              </Typography>
              <Typography variant="body1">
                <strong>Bonus:</strong> {employee?.bonus || "$5,000"}
              </Typography>
              <Typography variant="body1">
                <strong>Attendance Rate:</strong> {employee?.attendanceRate || "95%"}
              </Typography>
              <Typography variant="body1">
                <strong>Leaves Taken:</strong> {employee?.leavesTaken || "3 Days"}
              </Typography>
              <Typography variant="body1">
                <strong>Last Attendance:</strong> {employee?.lastAttendance || "2024-12-20"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </div>
  );
};

export default EmployeeDetail;
