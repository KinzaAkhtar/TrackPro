import React, { useState, useEffect } from 'react';

const AttendanceAndLeave = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Mock data for attendance and leaves
    setAttendanceData([
      { date: '2024-12-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present'},
      { date: '2024-12-02', checkIn: '', checkOut: '', status: 'Absent' },
      { date: '2024-12-03', checkIn: '10:00 AM', checkOut: '04:00 PM', status: 'Late'},
    ]);

    setLeaveData([
      { type: 'Sick Leave', startDate: '2024-12-02', endDate: '2024-12-02',  status: 'Approved'},
      { type: 'Annual Leave', startDate: '2024-11-20', endDate: '2024-11-22', status: 'Approved' },
    ]);
  }, []);

  const handleLeaveFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    alert('Leave request submitted successfully!');
    // Reset form
    setLeaveForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  const styles = {
    container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
    section: { marginBottom: '30px' },
    sectionTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' },
    table: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
    th: { border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgb(50, 205, 50,0.2)', fontWeight: 'bold' },
    td: { border: '1px solid #ddd', padding: '8px', textAlign: 'center' },
    form: { display: 'grid', gap: '10px', maxWidth: '400px', margin: 'auto' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
    button: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttonSecondary: { padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    cardContainer: { display: 'flex', gap: '20px', marginBottom: '20px' },
    card: { flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor:" rgb(50, 205, 50,0.2)", textAlign: 'center' },
    cardTotal: {flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#4169E1', textAlign: 'center'},
    cardPresent: { flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#28a745', textAlign: 'center' },
    cardAbsent: { flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#dc3545', textAlign: 'center' },
    cardLate: { flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '8px',backgroundColor: '#ffc107', color: '#000', textAlign: 'center' },
    cardDefault: { flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#17a2b8', textAlign: 'center' },
    cardTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
    cardValue: { fontSize: '16px' },
  };

  return (
    <div style={styles.container}>
      {/* Attendance Summary */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Attendance Summary</h2>
        <div style={styles.cardContainer}>
          <div style={styles.cardTotal}>
            <h3 style={styles.cardTitle}>Total Working Days</h3>
            <p style={styles.cardValue}><b>22</b></p>
          </div>
          <div style={styles.cardPresent}>
            <h3 style={styles.cardTitle}>Days Present</h3>
            <p style={styles.cardValue}><b>20</b></p>
          </div>
          <div style={styles.cardAbsent}>
            <h3 style={styles.cardTitle}>Days Absent</h3>
            <p style={styles.cardValue}><b>2</b></p>
          </div>
          <div style={styles.cardLate}>
            <h3 style={styles.cardTitle}>Late Arrivals</h3>
            <p style={styles.cardValue}><b>1</b></p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Attendance Records</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Check-In</th>
              <th style={styles.th}>Check-Out</th>
              <th style={styles.th}>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td style={styles.td}>{record.date}</td>
                <td style={styles.td}>{record.checkIn || 'N/A'}</td>
                <td style={styles.td}>{record.checkOut || 'N/A'}</td>
                <td style={styles.td}>{record.status}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave Management */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Leave Management</h2>

        {/* Leave Summary */}
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Allowed Leaves</h3>
            <p style={styles.cardValue}>24</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Remaining Leaves</h3>
            <p style={styles.cardValue}>12 Remaining</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Unpproved Leaves</h3>
            <p style={styles.cardValue}>8 Remaining</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Approved Leaves</h3>
            <p style={styles.cardValue}>4 Remaining</p>
          </div>
        </div>

        {/* Leave Application Form */}
        <h3 style={{ ...styles.sectionTitle, fontSize: '20px' }}>Apply for Leave</h3>
        <form style={styles.form} onSubmit={handleLeaveSubmit}>
          <select
            name="leaveType"
            value={leaveForm.leaveType}
            onChange={handleLeaveFormChange}
            style={styles.input}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Maternity Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Study Leave">Study Leave</option>
            <option value="Bereavement Leave">Bereavement Leave</option>
            <option value="Personal Leave">Personal Leave</option>



          </select>
         
          <input
            type="date"
            name="startDate"
            value={leaveForm.startDate}
            onChange={handleLeaveFormChange}
            style={styles.input}
            required
          />
          <input
          label="End Date"
            type="date"
            name="endDate"
            value={leaveForm.endDate}
            onChange={handleLeaveFormChange}
            style={styles.input}
            required
          />
          
          <button type="submit" style={styles.button}>Submit Leave Request</button>
        </form>

        {/* Leave History */}
        <h3 style={{ ...styles.sectionTitle, fontSize: '20px' }}>Leave History</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Leave Type</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>End Date</th>
              <th style={styles.th}>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr key={index}>
                <td style={styles.td}>{leave.type}</td>
                <td style={styles.td}>{leave.startDate}</td>
                <td style={styles.td}>{leave.endDate}</td>
                
                <td style={styles.td}>{leave.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceAndLeave;
