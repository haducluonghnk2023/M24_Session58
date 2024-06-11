import React from "react";
import "./navbar.css";

type Student = {
  student_name: string;
  email: string;
  address: string;
  phone: string;
  id: number;
  status: boolean;
};

interface StudentListProps {
  students: Student[];
  onDeleteButtonClick: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  onDeleteButtonClick,
}) => {
  return (
    <table border={1} style={{ width: "100%", textAlign: "center" }}>
      <thead>
        <tr>
          <th>
            <span className="material-symbols-outlined">
              check_box_outline_blank
            </span>
          </th>
          <th>Tên sinh viên</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Lựa chọn</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>
              <span className="material-symbols-outlined">
                check_box_outline_blank
              </span>
            </td>
            <td>{student.student_name}</td>
            <td>{student.email}</td>
            <td>{student.address}</td>
            <td>{student.phone}</td>
            <td>
              <span className="material-symbols-outlined">edit</span>
              <span
                className="material-symbols-outlined"
                style={{ cursor: "pointer" }}
                onClick={() => onDeleteButtonClick(student)}
              >
                delete
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
