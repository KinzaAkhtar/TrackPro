import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const EmployeePayrollScreen = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock data for employee payroll details
    const mockPayrollData = [
      {
        id: 1,
        pay_period_start: '2024-12-01',
        pay_period_end: '2024-12-31',
        gross_salary: 5000,
        deductions: 300,
        taxes: 200,
        net_salary: 4500,
        payment_date: '2024-12-31',
        status: 'Paid',
        remarks: 'Year-end bonus included',
      },
      {
        id: 2,
        pay_period_start: '2024-11-01',
        pay_period_end: '2024-11-30',
        gross_salary: 5000,
        deductions: 300,
        taxes: 200,
        net_salary: 4500,
        payment_date: '2024-11-30',
        status: 'Paid',
        remarks: '',
      },
    ];

    setPayrollData(mockPayrollData);
  }, []);

  // Filter payroll data based on search
  const filteredPayrollData = payrollData.filter((payroll) =>
    payroll.pay_period_start.includes(search) ||
    payroll.pay_period_end.includes(search)
  );

  // Generate Payslip PDF using jsPDF
  const generatePaySlip = (payroll) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Payslip', 20, 20);

    doc.setFontSize(12);
    doc.text(`Pay Period: ${payroll.pay_period_start} to ${payroll.pay_period_end}`, 20, 30);
    doc.text(`Gross Salary: ${payroll.gross_salary}`, 20, 40);
    doc.text(`Deductions: ${payroll.deductions}`, 20, 50);
    doc.text(`Taxes: ${payroll.taxes}`, 20, 60);
    doc.text(`Net Salary: ${payroll.net_salary}`, 20, 70);
    doc.text(`Payment Date: ${payroll.payment_date}`, 20, 80);
    doc.text(`Status: ${payroll.status}`, 20, 90);
    doc.text(`Remarks: ${payroll.remarks || 'N/A'}`, 20, 100);

    doc.save(`Payslip_${payroll.pay_period_start}_${payroll.pay_period_end}.pdf`);
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">My Payroll</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Search by Pay Period (e.g., 2024-12)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Payroll Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 mb-8">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Pay Period</th>
              <th className="px-4 py-2 border border-gray-300">Gross Salary</th>
              <th className="px-4 py-2 border border-gray-300">Deductions</th>
              <th className="px-4 py-2 border border-gray-300">Taxes</th>
              <th className="px-4 py-2 border border-gray-300">Net Salary</th>
              <th className="px-4 py-2 border border-gray-300">Payment Date</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Remarks</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrollData.length > 0 ? (
              filteredPayrollData.map((payroll) => (
                <tr key={payroll.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {payroll.pay_period_start} to {payroll.pay_period_end}
                  </td>
                  <td className="px-4 py-2">{payroll.gross_salary}</td>
                  <td className="px-4 py-2">{payroll.deductions}</td>
                  <td className="px-4 py-2">{payroll.taxes}</td>
                  <td className="px-4 py-2">{payroll.net_salary}</td>
                  <td className="px-4 py-2">{payroll.payment_date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        payroll.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{payroll.remarks || 'N/A'}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() => generatePaySlip(payroll)}
                    >
                      Generate Pay Slip
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-2 text-center">No payroll records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePayrollScreen;
