import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegistrationPageStyles.css"

export default function RegistrationPage(){
    var navigate = useNavigate()

    function Registration(){
        var obj = GetRegistrationObject()
        var request = JSON.stringify(obj)

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "http://localhost:5001/secrets/create")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(request)
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 201){
            console.log("Успешная регистрация")
            window.localStorage.setItem("userFirstName", obj.firstName)
            window.localStorage.setItem("userSecondName", obj.secondName)
            var userId = JSON.parse(xhr.responseText)
            console.log(userId)
            window.localStorage.setItem("userId", userId)
            navigate("/now-events")
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось зарегистрироваться")
          }
        }
    }

    function GetRegistrationObject(){
        return {
            email: document.getElementById("registration-email").value,
            password: document.getElementById("registration-password").value,
            passwordConfirm: document.getElementById("registration-confirmPassword").value,
            firstName: document.getElementById("registration-firstName").value,
            secondName: document.getElementById("registration-secondName").value
        }
    }

    return (
        <div style={styles} className="registration-page">
            <img src= "./img/projectHunt-login.svg"></img>
            <div className='registration-main'>
                <p className='registration-main-title'>Зарегистрируйтесь, чтобы найти команду своей мечты</p>
                <div className="registration-main-inputs">
                    <input id="registration-firstName" placeholder="Имя" type={"text"}></input>
                    <input id="registration-secondName" placeholder="Фамилия" type={"text"}></input>
                    <input id="registration-email" placeholder="Email" type={"email"}></input>
                    <input id="registration-password" placeholder="Пароль" type={"password"}></input>
                    <input id="registration-confirmPassword" placeholder="Повторите пароль" type={"password"}></input>
                </div>
                <div onClick={() => Registration()} className="registration-main-create">
                    <p>Создать аккаунт</p>
                </div>
                <div className="registration-main-bottom_text">
                    <p>Есть аккаунт? <Link to={"/login"}>Вход</Link></p>
                </div>
            </div>
        </div>
    );
}