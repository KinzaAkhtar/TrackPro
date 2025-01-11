import React from "react";
import "./TaskManagement.css";

const TeamTable = ({ team }) => (
  <div className={styles.teamTable}>
    <h2>Team Members</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Availability</th>
          <th>Performance</th>
          <th>Assigned Tasks</th>
        </tr>
      </thead>
      <tbody>
        {team.map((member) => (
          <tr key={member.id}>
            <td>{member.name}</td>
            <td>{member.availability}</td>
            <td>{member.performance}</td>
            <td>{member.assignedTasks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TeamTable;
