import React, { useState } from "react";

type Student = {
  student_name: string;
  email: string;
  address: string;
  phone: string;
  id: number;
  status: boolean;
};

interface HeaderProps {
  onAddStudent: (student: Omit<Student, "id">) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddStudent }) => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    student_name: "",
    email: "",
    address: "",
    phone: "",
    status: true,
  });
  const [errors, setErrors] = useState<{
    student_name?: string;
    email?: string;
    phone?: string;
  }>({});

  const handleAddNewStudent = () => {
    setIsAddFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const validate = () => {
    const newErrors: { student_name?: string; email?: string; phone?: string } =
      {};
    if (!newStudent.student_name)
      newErrors.student_name = "Tên sinh viên không được để trống";
    if (!newStudent.email) newErrors.email = "Email không được để trống";
    else if (!/\S+@\S+\.\S+/.test(newStudent.email))
      newErrors.email = "Email không đúng định dạng";
    if (!/^\d+$/.test(newStudent.phone))
      newErrors.phone = "Số điện thoại chỉ được phép nhập số";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStudentSubmit = () => {
    if (validate()) {
      onAddStudent(newStudent);
      setIsAddFormOpen(false);
      setNewStudent({
        student_name: "",
        email: "",
        address: "",
        phone: "",
        status: true,
      });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "red",
        }}
      >
        <h2>Quản lí sinh viên</h2>
        <p
          style={{
            width: "180px",
            height: "40px",
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={handleAddNewStudent}
        >
          Thêm mới sinh viên
        </p>
      </div>
      {isAddFormOpen && (
        <dialog open>
          <h2>Thêm mới sinh viên</h2>
          <div>
            <label>Tên sinh viên:</label>
            <input
              type="text"
              name="student_name"
              value={newStudent.student_name}
              onChange={handleInputChange}
            />
            {errors.student_name && (
              <p style={{ color: "red" }}>{errors.student_name}</p>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <label>Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={newStudent.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>
          <button onClick={() => setIsAddFormOpen(false)}>Hủy</button>
          <button
            onClick={handleAddStudentSubmit}
            style={{ backgroundColor: "green" }}
          >
            Add
          </button>
        </dialog>
      )}
    </div>
  );
};

export default Header;
