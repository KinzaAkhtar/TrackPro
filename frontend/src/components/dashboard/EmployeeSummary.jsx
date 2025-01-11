import React, { useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Button, Snackbar, Alert } from "@mui/material";

const Dashboard = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false); // Track if user has checked in
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCheckIn = () => {
    const timestamp = new Date().toLocaleString();
    setSnackbarMessage(`Checked in at ${timestamp}`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setHasCheckedIn(true); // Enable checkout button
  };

  const handleCheckOut = () => {
    const timestamp = new Date().toLocaleString();
    setSnackbarMessage(`Checked out at ${timestamp}`);
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
    setHasCheckedIn(false); // Disable checkout button after checking out
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* System Admin Dashboard Section */}
      <div style={styles.employeeDashboardSection}>
        <div style={styles.employeeCard}>
          <h3 style={styles.employeeTitle}>Welcome Back, Hiba!</h3>
          <div style={styles.buttonContainer}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCheckIn}
              style={styles.button}
              disabled={hasCheckedIn} // Disable check-in button after user has checked in
            >
              Check-In
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCheckOut}
              style={styles.button}
              disabled={!hasCheckedIn} // Disable check-out button until user has checked in
            >
              Check-Out
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div style={styles.summarySection}>
        {summaryData.map((item, index) => (
          <div
            key={index}
            style={{ ...styles.summaryCard, backgroundColor: item.color }}
          >
            <h3 style={styles.cardTitle}>{item.title}</h3>
            <div style={{ ...styles.chartWrapper, height: "150px", width: "150px" }}>
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
            </div>
            <p style={styles.cardValue}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Progress */}
      <div style={styles.performanceSection}>
        <h3 style={styles.sectionTitle}>Performance Progress</h3>
        <div style={styles.progressBarContainer}>
          <div style={styles.progressBar}></div>
        </div>
        <p style={styles.progressText}>80% of monthly target achieved</p>
      </div>

      {/* Charts Section */}
      <div style={styles.chartsSection}>
        {chartData.map((chart, index) => (
          <div key={index} style={styles.chartCard}>
            <h4 style={styles.chartTitle}>{chart.title}</h4>
            <div style={styles.chartWrapper}>{chart.component}</div>
          </div>
        ))}
      </div>

      {/* Snackbar Notification */}
      <Snackbar
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
      </Snackbar>
    </div>
  );
};

// Dummy Data for Summary Cards
const summaryData = [
  {
    title: <b>Total Working Hours</b>,
    value: "120 hrs",
    color:" rgba(245, 158, 11, 0.5)",
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
    title: <b>Attendance Percentage</b>,
    value: "95%",
    color:" rgba(245, 158, 11, 0.5)",
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
    title: <b>Tasks Completed</b>,
    value: "42/50",
    color: "rgba(245, 158, 11, 0.5)",
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
    title: <b>Leave Balance</b>,
    value: "5 Days",
    color: "rgba(245, 158, 11, 0.5)",
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

// Dummy Data for Additional Charts
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
              data: [50, 20, 15, 10],
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

// Styles
const styles = {
  dashboardContainer: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  employeeDashboardSection: {
    marginBottom: "30px",
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  employeeCard: {
    padding: "20px",
    background: "linear-gradient(to left, #FF5722, #FFC107, #FFEB3B)",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    color: "#fff",
  },
  employeeTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },
  button: {
    fontSize: "1rem",
  },
  // Modify Summary and Charts Section Styles
  summarySection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  summaryCard: {
    width: "22%",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  },
  chartWrapper: {
    position: "relative",
    marginTop: "10px",
  },
  performanceSection: {
    marginBottom: "30px",
    padding: "20px",
    background: "#F9FAFB",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  progressBarContainer: {
    width: "100%",
    height: "20px",
    backgroundColor: "#E5E7EB",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    width: "80%",
    backgroundColor: "#10B981",
  },
  progressText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "1rem",
  },
  chartsSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  chartCard: {
    width: "48%",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  chartTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "15px",
  },
};

export default Dashboard;
