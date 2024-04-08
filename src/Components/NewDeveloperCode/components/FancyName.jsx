import React from "react";

const FancyName = ({ name }) => {

  return (
    <p className="text-shdaow-color text-sm">
      {name.replace("Odd Run Bhav", "").replace("Even Run Bhav", "").replace("Runs", "").replace("Over", "ovr").replace("(N)", "").replace("Adv", "").replace("(2)", "")}
    </p>
  );
};

export default FancyName;
