import React, {useEffect, useState} from "react";
import MembersPageFilter from "../Filters/MembersPageFilter";
import MemberCardList from "../MemberCardList/MemberCardList";
import Context from "../Contexts/Context";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Header from "../Header/Header";
import styles from "./MembersListPageStyles.css"
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

var start_members = []

export default function MembersPage(){
  var [members, setMembers] = React.useState([])
  var [eventInfo, setEventInfo] = React.useState({})
  var [isAdmin, setIsAdmin] = useState(false)
  var [loading, setLoading] = React.useState(true)
  var navigate = useNavigate()
  var eventId = window.location.href.slice(window.location.href.indexOf("/members-list") - 36, window.location.href.indexOf("/members-list"))

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    CheckAdmin()
    GetMembersFromServer()
    GetEventName()
  }, [])

  function GetMembersFromServer(){ 
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true
    xhr.open("GET", "http://localhost:5001/catalogs/getEventUserCards?eventId=" + eventId)
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
    xhr.send()

    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText)
        start_members = JSON.parse("[" + xhr.responseText + "]")[0]
        setMembers(JSON.parse("[" + xhr.responseText + "]")[0])
        setLoading(false)
      }

      if (xhr.readyState === 4 && (xhr.status === 401 || xhr.status === 0)){
        console.log("readyState = " + xhr.readyState)
        console.log("status = " + xhr.status)
        navigate("/login")
      }
    }
  }

  function CheckAdmin(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true
    xhr.open("GET", "http://localhost:5001/secrets/isAdmin")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получили список мероприятий!")
            setIsAdmin(JSON.parse("[" + xhr.responseText + "]")[0])
        }
        if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить список мероприятий")
        }
    }
}

  function GetEventName(){
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true
      xhr.open("GET", "http://localhost:5001/catalogs/getEventById?eventId=" + eventId)
      xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
      xhr.setRequestHeader("Content-type", "application/json")
      xhr.send()
  
      xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
              setEventInfo(JSON.parse('[' + xhr.responseText + ']')[0])
          }
      }
  }

  return (
      <Context.Provider value={{start_members, members, setMembers}}>
        <Header></Header>
        <div style={styles} className="wrapper">
          {
          <div className="members-page">
            <BreadCrumb link={"/now-events"} title="К мероприятиям"></BreadCrumb>
            <div className="projects-page-title">
                {eventInfo.name == null ? <Loader isMiniLoader={true}/> : <h1>{eventInfo.name}</h1>}
                {isAdmin && 
                <div className="projects-page-title-accessCode">
                    <p>Код мероприятия:</p>
                    <div className="projects-page-title-accessCode-code">
                        <p>{eventInfo.accessCode == null ? "" : eventInfo.accessCode}</p>
                    </div>
                </div>}
            </div>
            <div className="title-lists">
                <Link to={"/" + eventId + "/projects-list"}>
                    <div className="members_project-list">
                        <p>Список проектов</p>
                    </div>
                </Link>
                <Link to={"/" + eventId + "/members-list"}>
                    <div className="members_members-list">
                        <p>Список участников</p>
                    </div> 
                </Link>
            </div>
            <MembersPageFilter count={members.length} roles={eventInfo.roles}></MembersPageFilter>
            { loading ? <Loader/> :
            (members.length === 0 
                    ?   <div className="members-page-empty">
                            <p>Пока что вы единственный участник мероприятия</p>
                        </div>
                    :   <MemberCardList members={members}></MemberCardList>
            )}
          </div>}
        </div>
        <Footer></Footer>
      </Context.Provider>
  );
}