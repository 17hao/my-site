import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "modules/auth/index.css";

export default function Login() {
    document.title = "Login";

    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const location = useLocation();

    async function submitHandler(event) {
        event.preventDefault();

        if (accountName === "" || password === "") {
            alert("accountName or password is empty")
            return;
        }

        var xhr = new XMLHttpRequest();

        if (process.env.REACT_APP_ENV === "prod") {
            xhr.open("POST", "https://api.shiqihao.xyz/account/verify", true);
        } else {
            xhr.open("POST", "http://127.0.0.1:9000/account/verify", true);
        }

        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            if (xhr.status !== 200) {
                alert("Network error");
                return;
            }

            const respBody = xhr.response;

            console.log(respBody);

            if (respBody.code !== "0" && respBody.message !== "ok") {
                alert(`Log in failed. Error message: ${respBody.message}`);
                return;
            }

            window.localStorage.setItem("sessionToken", respBody.data);
            navigate(location.state.from);
        };

        const requestBody = {
            "name": accountName,
            "password": password,
        };
        xhr.send(JSON.stringify(requestBody));
    }

    return (
        <div id="login">
            <h1>Log in to Lab</h1>
            <form id="loginForm" onSubmit={submitHandler}>
                <label>Username</label>
                <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)}></input>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button id="loginButton">Submit</button>
            </form>
        </div>
    );
}
