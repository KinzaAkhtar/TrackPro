import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement,PointElement,LineElement,} from "chart.js";
import List from '../employee/List';

const AdminSummary = () => {
  const cardData = [
    { title: "Total Employees", value: 50, bgColor: "bg-red-500" },
    { title: "New Employees (This Month)", value: 15, bgColor: "bg-yellow-500" },
    { title: "Present Employees (Today)", value: 45, bgColor: "bg-green-500" },
    { title: "Total Tasks", value: 100, bgColor: "bg-blue-500" },

  ];

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

  // Daily task completion chart data
  const taskCompletionData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [10, 25, 40, 20, 15],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
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
        style={{ background: "linear-gradient(to left, #f44336, #ff9800, #ffeb3b)" }}
      >
        <CardContent>
          <Typography variant="h4" component="div" className="font-bold text-5xl">
            System Admin Dashboard
          </Typography>
          <Typography variant="h4" component="div" className="font-bold text-5xl mt-2">
            TrackPro!
          </Typography>
          <Typography variant="body2" component="div" className="font-normal text-lg text-gray-600 mt-4">
            Welcome to TrackPro! Employee Performance Monitoring tool.
          </Typography>
          <Link
            to="/admin-dashboard/add-employee"
            className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white mt-4 inline-block"
          >
            Add New Employee
          </Link>
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
                Tasks Completed Daily
              </Typography>
              <Line data={taskCompletionData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card className="p-6 shadow-md bg-white h-full" style={{ height: "100%" }}>
            <CardContent style={{ padding: 0, height: "100%" }}>
              <Typography variant="h6" component="div" className="font-bold text-lg">
                Employees KPI
              </Typography>
              <Bar data={kpiData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    
  
    </Box>
);    
};

export default AdminSummary;
