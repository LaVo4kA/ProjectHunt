import React from "react";
import { Link } from "react-router-dom";
import ProjectsCard from "../Cards/ProjectsCard";

export default function ProjectsCardList(props){
    var projects = props.projects
    var eventId = window.location.href.slice(window.location.href.indexOf("/projects-list") - 36, window.location.href.indexOf("/projects-list"))
    console.log(eventId)
    return(
        <div className="project-card-list">
            {projects.map(project => {
                return <Link to={"/" + eventId + "/" + project.id} key={project.id}><ProjectsCard project={project}></ProjectsCard></Link>
            })}
        </div>
    );
}