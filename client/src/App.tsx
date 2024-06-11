// import React from "react";
// import GetAllStudent from "./components/GetAllStudent";
// import GetStudentById from "./components/GetStudentById";
// import RemoveById from "./components/RemoveById";
// import CreateStudent from "./components/CreateStudent";
// import UpdateStudent from "./components/UpdateStudent";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

type Student = {
  student_name: string;
  email: string;
  address: string;
  phone: string;
  id: number;
  status: boolean;
};

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get<Student[]>("http://localhost:3000/student")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sinh viên!", error);
      });
  };

  const addStudent = (student: Omit<Student, "id">) => {
    axios
      .post("http://localhost:3000/student", student)
      .then(() => {
        fetchStudents();
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sinh viên!", error);
      });
  };
  const deleteStudent = (id: number) => {
    axios
      .delete(`http://localhost:3000/student/${id}`)
      .then(() => {
        fetchStudents();
        setShowConfirmationModal(false); // Đóng modal sau khi xóa thành công
      })
      .catch((error) => {
        console.error("Lỗi khi xóa sinh viên!", error);
      });
  };

  const handleDeleteButtonClick = (student: Student) => {
    setStudentToDelete(student);
    setShowConfirmationModal(true); // Mở modal xác nhận khi click vào icon "Xóa"
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false); // Đóng modal khi click vào nút "Hủy"
    setStudentToDelete(null); // Xóa thông tin sinh viên cần xóa
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete.id); // Xác nhận xóa sinh viên khi click vào nút "Xóa"
    }
  };
  return (
    <div>
      {/* <GetAllStudent></GetAllStudent>
      <GetStudentById></GetStudentById>
      <RemoveById></RemoveById>
      <CreateStudent></CreateStudent>
      <UpdateStudent></UpdateStudent> */}
      <Header onAddStudent={addStudent}></Header>
      <Navbar
        students={students}
        onDeleteButtonClick={handleDeleteButtonClick}
      ></Navbar>
      <Footer></Footer>
      {showConfirmationModal && studentToDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Xác nhận xóa</h2>
            <p>
              Bạn có chắc chắn muốn xóa sinh viên này:{" "}
              {studentToDelete.student_name}?
            </p>
            <button onClick={handleCancelDelete}>Hủy</button>
            <button
              onClick={handleConfirmDelete}
              style={{ backgroundColor: "red" }}
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
