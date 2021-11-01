import React from 'react';

function Sidebar({child}){
  return (
    <div className="side-bar">
      <p>{child.name}</p>
    </div>
  );
}

export default Sidebar;
