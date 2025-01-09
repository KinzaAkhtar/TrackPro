import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PayrollScreen = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock data for employee payroll details
    const mockEmployeeData = [
      {
        id: 1,
        employee_id: 'E001',
        employee_name: 'John Doe',
        position: 'Software Developer',
        department: 'IT',
        salary: 5000,
        bonus: 200,
        deductions: 300,
        allowances: 100,
        overtime: 50,
        gross_salary: 5050,
        net_salary: 4750,
        pay_period_start: '2024-12-01',
        pay_period_end: '2024-12-31',
        payment_date: '2024-12-31',
        leaves_taken: 2,
        absences: 1,
      },
      {
        id: 2,
        employee_id: 'E002',
        employee_name: 'Jane Smith',
        position: 'HR Manager',
        department: 'HR',
        salary: 6000,
        bonus: 300,
        deductions: 400,
        allowances: 200,
        overtime: 0,
        gross_salary: 6100,
        net_salary: 5700,
        pay_period_start: '2024-12-01',
        pay_period_end: '2024-12-31',
        payment_date: '2024-12-31',
        leaves_taken: 1,
        absences: 0,
      },
    ];

    setEmployeeData(mockEmployeeData);
  }, []);

  // Filter employee data based on search
  const filteredEmployeeData = employeeData.filter(employee =>
    employee.employee_name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate deductions for tax, provident fund, and others
  const calculateDeductions = (salary) => {
    const taxRate = 0.1; // 10% tax
    const pfRate = 0.05; // 5% Provident Fund
    const taxDeduction = salary * taxRate;
    const pfDeduction = salary * pfRate;

    return {
      tax: taxDeduction,
      pf: pfDeduction,
      totalDeductions: taxDeduction + pfDeduction,
    };
  };

  // Calculate salary after deductions and impact of leave
  const calculateSalaryWithLeaveImpact = (employee) => {
    const leavePenalty = 100; // Example of per-day leave deduction
    const unpaidLeaveDays = employee.leaves_taken; // Number of unpaid leave days
    const totalLeavePenalty = leavePenalty * unpaidLeaveDays;

    const deductions = calculateDeductions(employee.salary);
    const updatedSalary = employee.salary - totalLeavePenalty - deductions.totalDeductions;

    return {
      ...employee,
      deductions: deductions.totalDeductions,
      net_salary: updatedSalary,
    };
  };

  const updatedPayrollWithLeave = employeeData.map(calculateSalaryWithLeaveImpact);

  // Generate Payslip PDF using jsPDF
  const generatePaySlip = (employee) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Payslip', 20, 20);

    doc.setFontSize(12);
    doc.text(`Employee ID: ${employee.employee_id}`, 20, 30);
    doc.text(`Name: ${employee.employee_name}`, 20, 40);
    doc.text(`Position: ${employee.position}`, 20, 50);
    doc.text(`Department: ${employee.department}`, 20, 60);
    doc.text(`Salary: ${employee.salary}`, 20, 70);
    doc.text(`Bonus: ${employee.bonus}`, 20, 80);
    doc.text(`Deductions: ${employee.deductions}`, 20, 90);
    doc.text(`Allowances: ${employee.allowances}`, 20, 100);
    doc.text(`Overtime: ${employee.overtime}`, 20, 110);
    doc.text(`Gross Salary: ${employee.gross_salary}`, 20, 120);
    doc.text(`Net Salary: ${employee.net_salary}`, 20, 130);
    doc.text(`Pay Period: ${employee.pay_period_start} to ${employee.pay_period_end}`, 20, 140);
    doc.text(`Payment Date: ${employee.payment_date}`, 20, 150);

    doc.save(`${employee.employee_name}_Payslip.pdf`);
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Employee Payroll Management</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <TextField
          variant="outlined"
          fullWidth
          label="Search by Employee Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Payroll Table */}
      <TableContainer component={Paper} className="overflow-x-auto mb-8">
        <Table aria-label="payroll table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Employee ID</TableCell>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Employee Name</TableCell>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Position</TableCell>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Gross Salary</TableCell>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Deductions</TableCell>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Net Salary</TableCell>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Payment Date</TableCell>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updatedPayrollWithLeave.length > 0 ? (
              updatedPayrollWithLeave.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.employee_id}</TableCell>
                  <TableCell>{employee.employee_name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.gross_salary}</TableCell>
                  <TableCell>{employee.deductions}</TableCell>
                  <TableCell>{employee.net_salary}</TableCell>
                  <TableCell>{employee.payment_date}</TableCell>
                  <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'rgb(239, 68, 68)', '&:hover': { backgroundColor: 'rgb(220, 50, 50)' } }}
                    onClick={() => generatePaySlip(employee)}
                  >
                    Generate Pay Slip
                  </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8" className="text-center">No payroll records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PayrollScreen;
