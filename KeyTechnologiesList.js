import React from "react";
import styles from "./KeyTechnologiesListStyles.css"

export default function KeyTechnologiesList(props) {
    var technologies = props.technologies == null ? [] : props.technologies
    var id = 0
    return (
        <div className="technologies-list">
            <ul style={styles}>
                {technologies.map(technology =>{
                    return <li key={id++}>{technology}</li>
                })}
            </ul>
        </div>
    );
}