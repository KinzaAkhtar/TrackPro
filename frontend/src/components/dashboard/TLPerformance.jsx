import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  return (
    <div style={styles.dashboardContainer}>
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
                  cutout: "70%", // Adjust the cutout percentage to make the chart smaller
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
          <div style={{ ...styles.progressBar, width: "80%" }}></div>
        </div>
        <p>80% of monthly target achieved</p>
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
    </div>
  );
};

// Dummy Data for Summary Cards
const summaryData = [
  {
    title: <b>Total Working Hours</b>,
    value: "120 hrs",
    color: "#3B82F6", // Royal Blue
    chartData: {
      labels: ["Worked", "Remaining"],
      datasets: [
        {
          data: [120, 40],
          backgroundColor: ["#2563EB", "#D1D5DB"], // Medium Blue, Light Gray
        },
      ],
    },
  },
  {
    title: <b>Attendance Percentage</b>,
    value: "95%",
    color: "#F59E0B", // Gold
    chartData: {
      labels: ["Present", "Absent"],
      datasets: [
        {
          data: [95, 5],
          backgroundColor: ["#10B981", "#D1D5DB"], // Emerald Green, Light Gray
        },
      ],
    },
  },
  {
    title: <b>Tasks Completed</b>,
    value: "42/50",
    color: "#10B981", // Emerald Green
    chartData: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [42, 8],
          backgroundColor: ["#3B82F6", "#FBBF24"], // Sky Blue, Amber
        },
      ],
    },
  },
  {
    title: <b>Leave Balance</b>,
    value: "5 Days",
    color: "#EF4444", // Vivid Red
    chartData: {
      labels: ["Used", "Remaining"],
      datasets: [
        {
          data: [15, 5],
          backgroundColor: ["#DC2626", "#34D399"], // Dark Red, Light Green
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
          maintainAspectRatio: false, // Adjust the chart to fit the card
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              ticks: { font: { size: 12 } }, // Smaller font for x-axis
            },
            y: {
              ticks: { font: { size: 12 } }, // Smaller font for y-axis
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
          maintainAspectRatio: false, // Adjust the chart to fit the card
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: { size: 12 }, // Smaller font for legend
              },
            },
          },
          cutout: "60%", // Smaller cutout for a compact chart
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
    backgroundColor: "#ffff",
    fontFamily: "Arial, sans-serif",
  },
  summarySection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  summaryCard: {
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px #b67726",
    textAlign: "center",
    height: "250px",
  },
  cardTitle: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#000000",
  },
  chartWrapper: {
    height: "120px",
    marginBottom: "10px",
  },
  cardValue: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000000",
  },
  performanceSection: {
    marginBottom: "30px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px #e02424",
  },
  progressBarContainer: {
    background: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
    height: "20px",
    margin: "10px 0",
  },
  progressBar: {
    height: "100%",
    background: "#4CAF50",
  },
  chartsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  chartCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px #e64d1e",
    height: "300px",
  },
  chartWrapper: {
    height: "250px",
    position: "relative",
  },
  chartTitle: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default Dashboard;
