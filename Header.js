import React, {useState, useEffect} from "react";
import styles from "./HeaderStyles.css"
import { Link, useNavigate } from "react-router-dom";

var notificationsIsActive = false;
var notificationsCount = 0

export default function Header(){
    var profileName = window.localStorage.getItem("userFirstName") + " " + window.localStorage.getItem("userSecondName")
    var [notifications, setNotifications] = useState([])
    var navigate = useNavigate()
    var t;

    useEffect(() => {
        GetNotificationsRequest()
        if(!notificationsIsActive)
        {
            notificationsIsActive = true
            t = setTimeout(function getNot(){
                console.log("начали получать уведомления")
                if(!notificationsIsActive) {return}
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true
                xhr.open("GET", "http://localhost:5001/catalogs/getNotifications")
                xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
                xhr.send()
            
                xhr.onreadystatechange = function(){
                    if (xhr.readyState === 4 && xhr.status === 200){
                        console.log("Успешно получили уведомления")
                        console.log(JSON.parse('[' + xhr.responseText + ']')[0])
                        var n = JSON.parse('[' + xhr.responseText + ']')[0]
                        setNotifications([...n])
                        notificationsCount = n.length
                        setTimeout(getNot, 5000)
                    }
                }
    
            }, 5000)
        }
    }, [])

    function GetNotificationsRequest(){
        console.log("начали получать уведомления")
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true
                xhr.open("GET", "http://localhost:5001/catalogs/getNotifications")
                xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
                xhr.send()
            
                xhr.onreadystatechange = function(){
                    if (xhr.readyState === 4 && xhr.status === 200){
                        console.log("Успешно получили уведомления")
                        var n = JSON.parse('[' + xhr.responseText + ']')[0]
                        setNotifications(n)
                    }
                }
    }

    function DeleteNotification(notificationId){
        var xhr = new XMLHttpRequest();
            xhr.withCredentials = true
            xhr.open("DELETE", "http://localhost:5001/catalogs/deleteNotification?notificationId=" + notificationId)
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
            xhr.send()
        
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status === 200){
                    notifications = notifications.filter(n => n.id !== notificationId)
                    setNotifications([...notifications])
                }
            }
    }

    function Logout(){
        clearTimeout(t)
        notificationsIsActive = false
        var xhr = new XMLHttpRequest();
            xhr.withCredentials = true
            xhr.open("POST", "http://localhost:5001/secrets/logout")
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
            xhr.send()
        
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status === 200){
                    console.log("Успешный выход из аккаунта")
                    window.localStorage.removeItem("userFirstName")
                    window.localStorage.removeItem("userSecondName")
                    window.localStorage.removeItem("userId")
                    navigate("/login")
                }
            }
    }

    function Hide(id){
        var e = document.getElementById(id)
        e.hidden = !e.hidden
    }

    function GetNotificationList(){
        var key = Math.random() * 1000
        return (
            notifications.map(notification => {
                return <div className="notification" key={key++}>
                    <div className="notification-cross-box">
                        <img onClick={() => DeleteNotification(notification.id)} src="../img/notification-cross.svg"></img>
                    </div>
                    <div className="notification-main">
                        <div className="notification-main-warning-box">
                            <img src="../img/notification-warning.svg"></img>
                        </div>
                        <div className="notification-main-content">
                            <h3>Вас исключили из проекта</h3>
                            <p><Link to={"/profile/" + notification.ownerId} className="notification-owner">{notification.ownerFirstName + " " + notification.ownerSecondName}</Link> снял вас с роли <span className="notification-role">{notification.role}</span> в проекте <Link to={"/" + notification.eventId + "/" + notification.projectId} className="notification-project">{notification.projectName}</Link></p>
                        </div>
                    </div>
                </div>
            })    
        );
    }

    function GetNotifications(){
        return (
            <div hidden id="notifications" className="notifications-box">
                <img className="notifications-box-polygon" src="../img/header-polygon.svg"></img>
                <div className="notifications-main">
                    {notifications.length === 0 
                    ? <p className="notification-empty">У вас пока нет уведомлений</p>
                    : GetNotificationList()
                    }          
                </div>  
            </div>
        )
    }

    return (
        <div style={styles} className="header">
            <div className="header-content">
                <Link to={"/now-events"}><img src="../img/projectHunt-header.svg" alt=""></img></Link>
                <div className="header-content-profile">
                    <div className="header-content-profile-notifications">
                        <div className="header-content-profile-notifications-bell_box">
                            <img onClick={() => Hide("notifications")} className="header-content-profile-bell" src="../img/bell-header.svg" alt=""></img>
                            {notifications.length !== 0 &&
                            <div className="header-content-profile-notifications-count">
                                <p>{notifications.length}</p>
                            </div>}
                        </div>
                        {GetNotifications()}
                    </div>
                    <div className="header-content-profile-user">
                        <p>{profileName}</p>
                        <div className="header-content-profile-user-photo">
                            <img className="header-content-profile-user-photo-photo" onClick={() => Hide("header-content-profile-user-photo-select")} src="../img/photo-header.svg" alt=""></img>
                            <div id="header-content-profile-user-photo-select" hidden className="header-content-profile-user-photo-select">
                                <img src="../img/header-polygon.svg"></img>
                                <ul>
                                    <Link to={"/me"}><li>Профиль</li></Link>
                                    <Link to={"/settings/profile"}><li>Настройки</li></Link>
                                    <a onClick={() => Logout()}><li>Выйти</li></a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}