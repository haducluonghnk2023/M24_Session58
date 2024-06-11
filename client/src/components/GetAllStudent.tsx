import axios from "axios";

export default function GetAllStudent() {
  async function GetAllStudent() {
    try {
      const response = await axios.get("http://localhost:3000/student");

      console.log(response.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Đã xảy ra lỗi khi lấy danh sách sinh viên:", error);
    }
  }
  GetAllStudent();
  return <div>GetAllStudent</div>;
}
