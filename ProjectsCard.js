import React from "react";
import CardList from "../CardList/CardList"

function CheckFreeRoles(project){
    if(project.freeRoleNames.length === 0){
        return <p className="busy">Команда сформирована</p>
    }
    else {
        return(
            <div>
                <CardList label="В поисках" labels={project.freeRoleNames}></CardList>
            </div>
        )
    }
}

export default function ProjectsCard(props){
    var project = props.project
    return (
        <div className="card">
            <div className="about">
                <div className="title">
                    <p className="title-name">{project.name}</p>
                    <div className="title-role">
                        <p>{project.keyTechnology}</p>
                    </div>
                </div>
                <p className="description">{project.motivation}</p>
            </div>
            {CheckFreeRoles(project)}
        </div>
    );
}