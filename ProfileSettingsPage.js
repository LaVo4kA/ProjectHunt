import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./ProfileSettingsPageStyles.css"
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function ProfileSettingsPage(){
    var [userInfo, setUserInfo] = useState({})
    var [loading, setLoading] = useState(true)
    var navigate = useNavigate()

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        GetUserInfo()
    }, [])

    function GetUserInfo(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/catalogs/getUserInfo?userId=me")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr.responseText)
                setUserInfo(JSON.parse("[" + xhr.responseText + "]")[0])
                setLoading(false)
            }
        }
    }

    function ChangeCheckbox(){
        var e = document.getElementById("email-show-checkbox-img")
        userInfo.showEmail = !userInfo.showEmail
        if(userInfo.showEmail === true){
            e.setAttribute("src", "../img/checkbox-on.svg")
        }
        else{
            e.setAttribute("src", "../img/checkbox-off.svg")
        }
    }

    function SaveSettings(){
        var settings = GetSettingsObject()
        var request = JSON.stringify(settings)
        console.log(settings)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("PUT", "http://localhost:5001/catalogs/updateUserInfo")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(request)
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log("Настройки успешно обновлены")
                window.localStorage.removeItem("userFirstName")
                window.localStorage.removeItem("userSecondName")
                window.localStorage.setItem("userFirstName", settings.firstName)
                window.localStorage.setItem("userSecondName", settings.secondName)
                window.location.reload()
            }

            if(xhr.readyState === 4 && xhr.status !== 200){
                console.log("Не удалось обновить настройки")
            }
        }
    }

    function GetSettingsObject(){
        return {
            id: localStorage.getItem("userId"),
            firstName: document.getElementById("settings-firstName").value,
            secondName: document.getElementById("settings-secondName").value,
            educationGroup: document.getElementById("settings-group").value,
            showEmail: userInfo.showEmail,
            vk: document.getElementById("settings-vk").value,
            telegram: document.getElementById("settings-telegram").value,
            comment: document.getElementById("settings-comment").value,
        }
    }

    return (
        <main style={styles} className="profile-settings-page">
            <Header></Header>
            <div className="wrapper">
                {loading ? <Loader/> :
                <div>
                    <div className="form">
                    <div className='options'>Настройки</div>
                    <div className='form1'>
                        <div className='account'>Учетная запись</div>
                        <div className='form2'>
                        <div className='form3'>
                            <div className='general_settings'>
                            <div className='general_settings_text'>Общие настройки</div>
                            <div className='general_settings_form'>
                                <div className='fi_form'>
                                <div className='nameForm'>
                                    <div className='name'>Имя<span className='colorName'>*</span></div>
                                    <input id="settings-firstName" className='inputName' type='text' defaultValue={userInfo.firstName}/>
                                </div>
                                <div className='surnameForm'>
                                    <div className='surname'>Фамилия<span className='colorSurname'>*</span></div>
                                    <input id="settings-secondName" className='inputSurname' type='text' defaultValue={userInfo.secondName}/>
                                </div>
                                </div>
                                <div className='groupForm'>
                                    <div className='group'>Академическая группа</div>
                                    <input id="settings-group" className='inputGroup' type='text' defaultValue={userInfo.educationGroup}/>
                                </div>
                            </div>
                            </div>
                            <div className='contacts'>
                            <div className='contacts_text'>Контактные данные</div>
                            <div onClick={() => ChangeCheckbox()} className='email-show-checkbox'>
                                <img id="email-show-checkbox-img" src={userInfo.showEmail ? "../img/checkbox-on.svg" : "../img/checkbox-off.svg"}></img>
                                <p>Показывать Email в профиле</p>
                            </div>
                            <div className='contactsForm'>
                                <div className='emailVkform'>
                                <div className='emailForm'>
                                    <div className='email'>Email<span className='colorEmail'>*</span></div>
                                    <input className='inputEmail' disabled type='text' placeholder='testmail@mail.com' defaultValue={userInfo.email}/>
                                </div>
                                <div className='vkForm'>
                                    <div className='vk'>VK</div>
                                    <input id="settings-vk" className='inputVk' type='text' placeholder='vk.com/examplelink' defaultValue={userInfo.vk}/>
                                </div>
                                </div>
                                <div className='telegram-commentsform'>
                                <div className='telegramForm'>
                                    <div className='telegram'>Telegram</div>
                                    <input id="settings-telegram" className='inputTelegram' type='text' placeholder='@username_example' defaultValue={userInfo.telegram}/>
                                </div>
                                <div className='commentForm'>
                                    <div className='comment'>Комментарий</div>
                                    <textarea id="settings-comment" className='inputComment' placeholder='Тут может быть ваш Instagram :)' defaultValue={userInfo.comment} maxLength={50}/>
                                </div>
                                <div className='comments'>Можете указать дополнительный способ связи или указать предпочтительный среди предложенных</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='selectionOfSettings'>
                            <div className='accountForm'>
                                <img className='iconProfile' src='../img/settings-profile.svg'/>
                                <div className='accountText'>Учётная запись</div>
                            </div>
                            <Link to={"/settings/events"}>
                                <div className='eventForm'>
                                    <img className='iconGroup' src='../img/settings-event.svg'/>
                                    <div className='eventText'>Мероприятия</div>
                                </div>
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                    <button className="settings-profile-save-btn" onClick={() => SaveSettings()}>Сохранить</button>
                </div>}
            </div>
            <Footer></Footer>
        </main>
    );
}