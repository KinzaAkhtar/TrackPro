import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const AttendanceManagement = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const mockAttendanceData = [
      {
        id: 1,
        employee_id: 'E001',
        employee_name: 'John Doe',
        date: '2024-12-29',
        clock_in: '9:00 AM',
        clock_out: '5:00 PM',
        status: 'Present',
      },
      {
        id: 2,
        employee_id: 'E002',
        employee_name: 'Jane Smith',
        date: '2024-12-29',
        clock_in: '9:30 AM',
        clock_out: '5:00 PM',
        status: 'Late',
      },
      { id: 3, employee_id: 'E003', employee_name: 'Alice Johnson', date: '2024-12-29', clock_in: '9:00 AM', clock_out: '5:00 PM', status: 'Present' },
      { id: 4, employee_id: 'E004', employee_name: 'Bob Martin', date: '2024-12-29', clock_in: '9:00 AM', clock_out: '5:00 PM', status: 'Present' },
      { id: 5, employee_id: 'E005', employee_name: 'Eve Davis', date: '2024-12-29', clock_in: '9:00 AM', clock_out: '5:00 PM', status: 'Late' },
      { id: 6, employee_id: 'E006', employee_name: 'Charlie Brown', date: '2024-12-29', clock_in: '9:00 AM', clock_out: '5:00 PM', status: 'Absent' },
      { id: 7, employee_id: 'E007', employee_name: 'Charlie Brown', date: '2024-12-29', clock_in: '9:00 AM', clock_out: '5:00 PM', status: 'Absent' },
    ];

    const mockLeaveRequests = [
      {
        id: 1,
        employee_name: 'John Doe',
        leave_type: 'Sick Leave',
        start_date: '2024-12-01',
        end_date: '2024-12-05',
        status: 'Approved',
      },
      { id: 2, employee_name: 'Jane Smith', leave_type: 'Vacation', start_date: '2024-12-15', end_date: '2024-12-20', status: 'Pending' },
    ];

    setAttendanceData(mockAttendanceData);
    setLeaveRequests(mockLeaveRequests);
  }, []);

  const filteredAttendanceData = attendanceData.filter((attendance) =>
    attendance.employee_name.toLowerCase().includes(search.toLowerCase()) &&
    (filterDate ? attendance.date === filterDate : true)
  );

  const handleApproveLeave = (leaveId) => {
    const updatedLeaveRequests = leaveRequests.map((leave) =>
      leave.id === leaveId ? { ...leave, status: 'Approved' } : leave
    );
    setLeaveRequests(updatedLeaveRequests);
  };

  const handleRejectLeave = (leaveId) => {
    const updatedLeaveRequests = leaveRequests.map((leave) =>
      leave.id === leaveId ? { ...leave, status: 'Rejected' } : leave
    );
    setLeaveRequests(updatedLeaveRequests);
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Employees Attendance Management</h1>

      {/* Search Bar */}
      <div className="mb-4 space-y-4">
        <TextField
          fullWidth
          variant="outlined"
          label="Search by Employee Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Attendance Table with MUI */}
      <h2 className="text-2xl font-semibold mb-4">Attendance Records</h2>
      <TableContainer component={Paper} className="overflow-y-auto max-h-80 mb-8">
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}> {/* Light grey background */}
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Clock-In</TableCell>
              <TableCell>Clock-Out</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendanceData.length > 0 ? (
              filteredAttendanceData.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>{attendance.employee_id}</TableCell>
                  <TableCell>{attendance.employee_name}</TableCell>
                  <TableCell>{attendance.date}</TableCell>
                  <TableCell>{attendance.clock_in}</TableCell>
                  <TableCell>{attendance.clock_out}</TableCell>
                  <TableCell>{attendance.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No attendance records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Leave Requests Section with MUI */}
      <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
      <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-y-auto max-h-80">
        <Table stickyHeader>
          <TableHead >
            <TableRow className="bg-gray-100 text-gray-600">
              <TableCell>Employee Name</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employee_name}</TableCell>
                <TableCell>{leave.leave_type}</TableCell>
                <TableCell>{leave.start_date}</TableCell>
                <TableCell>{leave.end_date}</TableCell>
                <TableCell>{leave.status}</TableCell>
                <TableCell>
                  {leave.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleApproveLeave(leave.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleRejectLeave(leave.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendanceManagement;
