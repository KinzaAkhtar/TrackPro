import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Doughnut, Line, Bar, Pie } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement,PointElement,LineElement,} from "chart.js";


// Registering the required chart.js components
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement,PointElement,LineElement);

const TLSummary = () => {
  const cardData = [
    { title: "Team Members", value: 50, bgColor: "bg-yellow-500/70" },
    { title: "Headcount: Male/Female", value: "15/20", bgColor: "bg-yellow-500/70" },
    { title: "Total Assigned Tasks", value: 100, bgColor: "bg-yellow-500/70" },
    { title: "Present Team Members", value: 45, bgColor: "bg-yellow-500/70" },
  ];


    // Department-wise employee distribution chart data
    const departmentData = {
        labels: ["HR", "Engineering", "Marketing", "Sales", "Finance"],
        datasets: [
          {
            data: [30, 40, 10, 15, 5],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            hoverOffset: 4,
          },
        ],
      };

  // KPI values of employees chart data
  const kpiData = {
    labels: ["Alice", "Bob", "Charlie", "David", "John Doe"],
    datasets: [
      {
        label: "KPI Score",
        data: [85, 90, 70, 80, 95],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Department performance data for the horizontal stacked bar chart
  const departmentPerformanceData = {
    labels: ["EBook", "Marketing", "Content Writing", "Web Development", "Design", "Publication", "Outsourcing", "Video"],
    datasets: [
      {
        label: "Overdue Tasks",
        data: [3, 5, 2, 4, 1,7,8,9],
        backgroundColor: "rgba(256, 0, 0, 0.6)",
      },
      {
        label: "In Progress Tasks",
        data: [10, 15, 7, 9, 6,12,45,67],
        backgroundColor: "rgba(243, 239, 18, 0.6)",
      },
      {
        label: "Completed Tasks",
        data: [17, 20, 5, 2, 2,8,5,6],
        backgroundColor: "rgba(25, 109, 9, 0.6)",
      },
    ],
  };

  // Daily task completion chart data
  const taskCompletionData = {
    labels: ["Alice", "John", "Doe", "Deer", "Sam"],
    datasets: [
      {
        label: "Employees",
        data: [10, 25, 40, 20, 15],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  //salary range data
  const salaryData = {
    labels: ["$0 - $50K", "$50K - $100K", "$100K - $150K", "$150K+"], // Salary ranges
    datasets: [
      {
        label: "Number of Employees by Salary Range",
        data: [10, 25, 8, 7], // Number of employees in each salary range
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Color for $0 - $50K range
          "rgba(75, 192, 192, 0.6)", // Color for $50K - $100K range
          "rgba(255, 159, 64, 0.6)", // Color for $100K - $150K range
          "rgba(255, 99, 132, 0.6)", // Color for $150K+ range
        ],
        borderColor: [
          "#36A2EB", "#4BC0C0", "#FF9F40", "#FF6384" // Border colors for each segment
        ],
        borderWidth: 1, // Border width
      },
    ],
  };
  

  const employeeData = {
    labels: ["Alice", "Bob", "Charlie", "David", "John Doe"], // Employee names
    datasets: [
      {
        label: "Pending Tasks",
        data: [5, 10, 6, 2, 7], // Pending tasks for each employee
        backgroundColor: "rgba(256, 0, 0, 0.6)", // Red color for pending tasks
        borderColor: "#FF6384", // Border color
        borderWidth: 1, // Border width
      },
      {
        label: "In Progress Tasks",
        data: [4, 8, 5, 3, 6], // In-progress tasks for each employee
        backgroundColor: "rgba(243, 239, 18, 0.6)", // Blue color for in-progress tasks
        borderColor: "#36A2EB", // Border color
        borderWidth: 1, // Border width
      },
      {
        label: "Done Tasks",
        data: [3, 7, 4, 3, 7], // Done tasks for each employee
        backgroundColor: "rgba(25, 109, 9, 0.6)", // Green color for done tasks
        borderColor: "#4BC0C0", // Border color
        borderWidth: 1, // Border width
      },
    ],
  };
   

  return (
    //Welcome Banner
    <Box
      className="p-4"
      style={{
        backgroundColor: "#f4f4f4", // Gray background color for the page
        minHeight: "100vh", // Ensures the body fills the full height of the screen
      }}
    >
    {/* Welcome Card */}
    <Card
        className="mb-6 p-6 bg-gradient-to-r from-red-800 via-orange-900 to-yellow-200 text-white shadow-lg"
        style={{ background: "linear-gradient(to left, #f44336, #ff9800, #ffeb3b)" }}>
        <CardContent>
            <Typography variant="h4" component="div" className="font-bold text-5xl">
            Team Lead Dashboard
            </Typography>
            <Typography variant="h4" component="div" className="font-bold text-5xl mt-2">
            TrackPro!
            </Typography>
            <Typography variant="body2" component="div" className="font-normal text-lg text-gray-600 mt-4">
            Welcome to TrackPro! Employee Performance Monitoring tool.
            </Typography>
        </CardContent>
    </Card>
    {/* Dashboard Card */}
    <div className="flex justify-center gap-4 p-4 pl-8 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`p-10 rounded-lg shadow-lg text-white ${card.bgColor} flex flex-col items-start`}
          >
            <h2 className="text-xl font-bold text-left">{card.title}</h2>
            <p className="text-3xl font-semibold text-left">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Task Completion and Employees KPI charts */}
    <Grid container spacing={4} style={{ marginTop: "15px" }}>
        <Grid item xs={12} sm={6} md={6}>
            <Card className="p-6 shadow-md bg-white h-full" style={{ height: "100%" }}>
                <CardContent style={{ padding: 0, height: "100%" }}>
                    <Typography variant="h6" component="div" className="font-bold text-lg">
                    Team Members Attendance Score
                    </Typography>
                    <Line data={taskCompletionData} />
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
            <Card className="p-6 shadow-md bg-white h-full" style={{ height: "100%" }}>
                <CardContent style={{ padding: 0, height: "100%" }}>
                    <Typography variant="h6" component="div" className="font-bold text-lg">
                    Team Members KPI
                    </Typography>
                    <Bar data={kpiData} />
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    {/* Graph: Employees by Department */}
    <Grid container spacing={4} style={{ marginTop: "15px" }}>
        <Grid item xs={12} sm={6} md={6}>
            <Card className="mb-6 p-6 shadow-md bg-white" style={{ height: "400px" }}>
                <CardContent style={{ padding: 0, height: "100%" }}>
                    <Typography variant="h6" component="div" className="font-bold text-lg">
                    Employees by Department
                    </Typography>
                    <div style={{ height: "320px" ,display: 'flex', justifyContent: "center" }}> {/* Increased height for graph */}
                        <Doughnut
                        data={departmentData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                            legend: {
                                position: "top",
                            },
                            },
                        }}
                        />
                    </div>
                </CardContent>
            </Card>   
        </Grid>
        {/* Dashboard Card */}
        <Grid item xs={12} sm={6} md={6}>
            <Card className="mb-6 p-6 shadow-md bg-white" style={{ height: "400px" }}>
                <CardContent style={{ padding: 0, height: "100%" }}>
                    <Typography variant="h6" component="div" className="font-bold text-lg">
                    Employees by Salary Range
                    </Typography>
                    <div style={{ height: "320px" ,display: 'flex', justifyContent: "center" }}>
                        <Pie data={salaryData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                            legend: {
                                position: "top",
                            },
                            },
                        }}
                        />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    <Grid container spacing={4} style={{ marginTop: "4px" }}>
        <Grid item xs={12} sm={6} md={6}>
            <Card className="p-6 shadow-md bg-white h-full" style={{ height: "100%" }}>
                <CardContent style={{ padding: 0, height: "100%" }}>
                    <Typography variant="h6" component="div" className="font-bold text-lg">
                    Task Completed by Team Members
                    </Typography>
                    <Bar data={employeeData} />
                </CardContent>
            </Card>
        </Grid>
    {/* Department Performance Horizontal Stacked Bar Chart */}
        <Grid item xs={12} sm={6} md={6}>
          <Card className="p-6 shadow-md bg-white">
            <CardContent style={{ padding: 0 }}>
              <Typography variant="h6" component="div" className="font-bold text-lg">
                Department Performance
              </Typography>
              <div style={{ height: "320px", display: "flex" }}>
                <Bar
                  data={departmentPerformanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    indexAxis: "y", // Set to horizontal stacking
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                        },
                    },
                }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
    </Grid>
    </Box>
);    
};

export default TLSummary;

