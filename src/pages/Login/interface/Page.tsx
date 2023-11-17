import React from "react";
import "./login.scss";
import axios from "axios";

export function Login() {
  // const CheckMail = (serverUsers: any, formData: any) => {
  //     const user = serverUsers.find((user: { email: any; }) => user.email == formData.email);
  //     if (user) return user;
  // }
  // const onSubmit = async (formData: any) => {
  //
  //     const user = await axios
  //         .get("http://localhost:8000/users")
  //         .then((res) => CheckMail(res.data, formData));
  //
  //     if (user) alert("email exists");
  //     await axios.post("http://localhost:8000/users", formData).then((res) => {
  //             console.log(res.data);
  //         });
  // };

  return (
    <>
      <form>
        <div className={"login-form"}>
          <div className={"form-email"}>
            <input type={"email"} name={"email"} placeholder={"email"} />
          </div>
          <div className={"form-password"}>
            <input
              type={"password"}
              name={"password"}
              placeholder={"password"}
            />
          </div>
          <div className={"form-button"}>
            <button type={"submit"}>logIn</button>
          </div>
        </div>
      </form>
    </>
  );
}
