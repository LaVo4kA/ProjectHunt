import React from "react";
import ProfileProjectsCard from "../Cards/ProfileProjectCard";
import { Link } from "react-router-dom";

export default function ProfileProjectCardsList(props){
    var id = 1
    return (
        <div className="profile-projects">
            {props.projects.map(project => {
                return (
                    <Link to={"/project/" + project.id} key={id++}><ProfileProjectsCard project={project}></ProfileProjectsCard></Link>
                )
            })}
        </div>
    );
}