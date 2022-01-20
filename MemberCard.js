import React from "react";
import CardList from "../CardList/CardList"

function CheckBusy(member){
    if(member.isBusy === true) {
        return (
            <p className="busy">Уже состоит в проекте</p>
        );
    }
    else {
        return(
            <div>
                <CardList label="Ключевые навыки" labels={member.skills}></CardList>
            </div>
        );
    }
}

export default function MemberCard(props) {
    const member = props.member
    return (
        <div className="card">
            <div className="about">
                <div className="title">
                    <p className="title-name">{member.firstName + " " + member.secondName}</p>
                    <div className="title-role">
                        <p>{member.role}</p>
                    </div>
                </div>
                <p className="description">{member.description}</p>
            </div>
            {CheckBusy(member)}
        </div>
    );
}