import React from "react";
import { Link } from "react-router-dom";
import MemberCard from "../Cards/MemberCard";

export default function MemberCardList(props){
    var members = props.members
    return (
        <div className="member-card-list">
            {members.map(member => {
                return <Link key={member.id} to={"/profile/" + member.id}><MemberCard member={member}></MemberCard></Link>
            })}
        </div>
    );
}