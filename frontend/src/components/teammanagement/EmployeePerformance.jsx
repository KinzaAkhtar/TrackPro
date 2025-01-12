import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import { Line, Doughnut } from "react-chartjs-2";
import {
  AssignmentTurnedIn as CompletedIcon,
  HourglassTop as InProgressIcon,
  CheckCircleOutline as ToDoIcon,
  ErrorOutline as OverdueIcon,
} from "@mui/icons-material";
import "chart.js/auto";

const EmployeePerformance = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Mock Data
  const employee = {
    name: "Talal Ahmed",
    designation: "Senior Software Engineer",
    tasks: {
      total: 50,
      completed: 42,
      inProgress: 5,
      toDo: 2,
      overdue: 1,
    },
  };

  const progressPercentage =
    (employee.tasks.completed / employee.tasks.total) * 100;
  // Summary Cards Data
  const summaryData = [
    {
      title: "Total Working Hours",
      value: "120 hrs",
      color: "#10B981",
      chartData: {
        labels: ["Worked", "Remaining"],
        datasets: [
          {
            data: [120, 40],
            backgroundColor: ["#2563EB", "#D1D5DB"],
          },
        ],
      },
    },
    {
      title: "Attendance ",
      value: "95%",
      color: "#10B981", // Updated color for this card
      chartData: {
        labels: ["Present", "Absent"],
        datasets: [
          {
            data: [95, 5],
            backgroundColor: ["#10B981", "#D1D5DB"],
          },
        ],
      },
    },
    {
      title: "Tasks Completed",
      value: "42/50",
      color: "#10B981", // Updated color for this card
      chartData: {
        labels: ["Completed", "Pending"],
        datasets: [
          {
            data: [42, 8],
            backgroundColor: ["#3B82F6", "#D1D5DB"],
          },
        ],
      },
    },
    {
      title: "Leave Balance",
      value: "5 Days",
      color: "#10B981", // Updated color for this card
      chartData: {
        labels: ["Used", "Remaining"],
        datasets: [
          {
            data: [15, 5],
            backgroundColor: ["#DC2626", "#D1D5DB"],
          },
        ],
      },
    },
  ];

  // Charts Section Data
  const chartData = [
    {
      title: "Productivity Over Time",
      component: (
        <Line
          data={{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Hours Worked",
                data: [30, 25, 40, 35],
                borderColor: "#4CAF50",
                tension: 0.3,
                fill: true,
                backgroundColor: "rgba(76, 175, 80, 0.1)",
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                ticks: { font: { size: 12 } },
              },
              y: {
                ticks: { font: { size: 12 } },
                beginAtZero: true,
              },
            },
          }}
        />
      ),
    },
    {
      title: "Task Status Breakdown",
      component: (
        <Doughnut
          data={{
            labels: ["Completed", "Pending", "In Progress", "Overdue"],
            datasets: [
              {
                data: [42, 8, 5, 1],
                backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#F44336"],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: { size: 12 },
                },
              },
            },
            cutout: "60%",
          }}
        />
      ),
    },
  ];

  return (
    <Box sx={{ padding: 3, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="h3" fontWeight="bold" color="#3B82F6">
          {employee.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontStyle: "italic" }}>
          {employee.designation}
        </Typography>
      </Box>

      {/* Summary Section */}
      <Grid container spacing={3}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3} sx={{ textAlign: "center", padding: 2, backgroundColor: 'rgb(50, 205, 50,0.2)'}}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: item.color }}>
                {item.title}
              </Typography>
              <Box
                sx={{
                  height: "150px",
                  width: "150px",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <Doughnut
                  data={item.chartData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                    cutout: "70%",
                  }}
                />
              </Box>
              <Typography variant="h5" sx={{ marginTop: 1 }}>
                {item.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Performance Progress */}
      <Box sx={{ marginY: 5 }}>
        <Typography variant="h6" fontWeight="bold">
          Performance Progress
        </Typography>
        <Box sx={{ position: "relative", width: "100%", marginTop: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 10,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4CAF50",
              },
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {Math.round(progressPercentage)}% of monthly target achieved
        </Typography>
      </Box>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {chartData.map((chart, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card elevation={3} sx={{ padding: 2, height: "100%" }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                {chart.title}
              </Typography>
              <Box
                sx={{
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {chart.component}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar Notification */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default EmployeePerformance;
