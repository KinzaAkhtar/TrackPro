import React, { useState, useEffect } from 'react';

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
        reason: 'Medical emergency',
        status: 'Approved',
      },
      { id: 2, employee_name: 'Jane Smith', leave_type: 'Vacation', start_date: '2024-12-15', end_date: '2024-12-20', reason: 'Holiday', status: 'Pending' },
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employees Attendance Management</h1>

      {/* Search Bar */}
      <div className="mb-4 space-y-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Search by Employee Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Attendance Table with Scroll and Sticky Header */}
      <div className="overflow-y-auto max-h-80 mb-8">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Employee ID</th>
              <th className="px-4 py-2 border border-gray-300">Employee Name</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Clock-In</th>
              <th className="px-4 py-2 border border-gray-300">Clock-Out</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendanceData.length > 0 ? (
              filteredAttendanceData.map((attendance) => (
                <tr key={attendance.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{attendance.employee_id}</td>
                  <td className="px-4 py-2">{attendance.employee_name}</td>
                  <td className="px-4 py-2">{attendance.date}</td>
                  <td className="px-4 py-2">{attendance.clock_in}</td>
                  <td className="px-4 py-2">{attendance.clock_out}</td>
                  <td className="px-4 py-2">{attendance.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center">No attendance records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Leave Requests Section with Scroll and Sticky Header */}
      <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
      <div className="overflow-y-auto max-h-80">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Employee Name</th>
              <th className="px-4 py-2 border border-gray-300">Leave Type</th>
              <th className="px-4 py-2 border border-gray-300">Start Date</th>
              <th className="px-4 py-2 border border-gray-300">End Date</th>
              <th className="px-4 py-2 border border-gray-300">Reason</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{leave.employee_name}</td>
                <td className="px-4 py-2">{leave.leave_type}</td>
                <td className="px-4 py-2">{leave.start_date}</td>
                <td className="px-4 py-2">{leave.end_date}</td>
                <td className="px-4 py-2">{leave.reason}</td>
                <td className="px-4 py-2">{leave.status}</td>
                <td className="px-4 py-2">
                  {leave.status === 'Pending' && (
                    <>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                        onClick={() => handleApproveLeave(leave.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleRejectLeave(leave.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceManagement;
