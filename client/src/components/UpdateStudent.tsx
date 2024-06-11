import axios from "axios";

export default function UpdateStudent() {
  // useEffect(() => {
  //   //cap nhat 1 bản ghi trong bản user
  //   // khi cap nhat phai biet id cua cai minh can cap nhat
  //   let newUser = {
  //     name: "minh quang",
  //   };
  //   axios
  //     .patch("http://localhost:8080/user/1", newUser)
  //     .then((res) => console.log("gia tri data", res))
  //     .catch((err) => console.log(err));
  // }, []);
  async function updateStudent(id: any) {
    let user = {
      student_name: "minh quang",
    };
    axios
      .patch(`http://localhost:3000/student/${id}`, user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  updateStudent(3);
  return <div>UpdateStudent</div>;
}
