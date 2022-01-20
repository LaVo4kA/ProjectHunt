import React from "react";
import styles from "./LoginPageStyles.css"
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    var navigate = useNavigate()
    
    function TryLogin(){
        var login = document.getElementById("input-email").value
        var password = document.getElementById("input-password").value
        var body = {Login: login, Password: password}
        var json = JSON.stringify(body)
      
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "http://localhost:5001/secrets/login")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(json)
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешная авторизация")
            var result = JSON.parse("[" + xhr.responseText + "]")[0]
            window.localStorage.setItem("userFirstName", result.firstName)
            window.localStorage.setItem("userSecondName", result.secondName)
            window.localStorage.removeItem("userId")
            window.localStorage.setItem("userId", result.userId)
            navigate("/now-events")
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось авторизоваться")
          }
        }
      }

    return (
        <div style={styles} className='login'>
            <img src= "./img/projectHunt-login.svg"></img>
            <div className='login-main'>
                <p className='login-main-label'>Войдите в аккаунт</p>
                <div className='login-main-inputs'>
                    <input id='input-email' placeholder="Email"></input>
                    <input type={"password"} id='input-password' placeholder="Пароль"></input>
                </div>
                <div className='login-main-buttons'>
                    <button onClick={() => TryLogin()} className='login-main-buttons-login'>Войти</button>
                    <Link to={"/registration"}><p className='login-main-buttons-registration'>Зарегистрироваться</p></Link>
                </div>
            </div>
        </div>
    );
}