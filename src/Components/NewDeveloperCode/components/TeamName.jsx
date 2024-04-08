import React from 'react';

function shortenTeamName(teamName) {
    // Split the team name into words
    const words = teamName.split(" ");
    
    // Extract the initials of each word
    let initials;
    if (words.length > 1) {
        initials = words.map(word => word.charAt(0).toUpperCase());
    } else {
        initials = [teamName.substring(0, 3).toUpperCase()];
    }
    
    // Join the initials together
    const shortenedName = initials.join("");
    
    return shortenedName;
}

function TeamComponent({ teamName }) {
    const shortenedName = shortenTeamName(teamName);

    return (
        <p className="fixshadow text-sm lg:text-xl shadow-md rounded-sm px-2 mr-3">
            {shortenedName}
        </p>
    );
}

export default TeamComponent;
