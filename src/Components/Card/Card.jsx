import React from "react";

const Card = (props) => {
  const dragStart = (e) => {
    const target = e.target;

    e.dataTransfer.setData("cardId", target.id);

    // setTimeout(() => {
    //   target.style.display = "none";
    // }, 0);
  };

  const dragOver = e => {
      e.stopPropagation();
  }

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onClick={()=>{props.setEmployee(props.id)}}
    >
      {props.children}
    </div>
  );
};

export default Card;
