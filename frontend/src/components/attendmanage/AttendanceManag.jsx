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

{/* Leave Requests Table */}
<TableContainer component={Paper} className="shadow-lg rounded-lg overflow-y-auto max-h-80">
  <Table stickyHeader>
    <TableHead sx={{ backgroundColor: '#e0e0e0' }}> {/* Light grey background */}
      <TableRow className="bg-gray-100 text-gray-600">
        <TableCell>Employee Name</TableCell>
        <TableCell>Leave Type</TableCell>
        <TableCell>Start Date</TableCell>
        <TableCell>End Date</TableCell>
        <TableCell>Reason</TableCell>
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
          <TableCell>{leave.reason}</TableCell>
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
