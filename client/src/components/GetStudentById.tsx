import axios from "axios";

export default function GetStudentById() {
  async function getStudentById(id: any) {
    await axios
      .get(`http://localhost:3000/student/${id}`)

      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  getStudentById(2);
  return <div>GetStudentById</div>;
}
