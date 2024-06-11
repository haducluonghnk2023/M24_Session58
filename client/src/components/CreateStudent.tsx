import axios from "axios";

export default function CreateStudent() {
  async function createStudent() {
    let newUser = {
      student_name: "quynh",
      email: "aa",
      address: "vinh phuc",
      phone: "1111",
      status: true,
    };
    axios
      .post("http://localhost:3000/student", newUser)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  createStudent();
  return <div>CreateStudent</div>;
}
