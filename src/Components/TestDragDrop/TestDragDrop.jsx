import React from "react";
import './Test.css';
import Board from '../Board/Board';
import Card from '../Card/Card';

const TestDragDrop = (props) => {
  return(<div className="flexbox">
    <Board id="board-1" className="board">
      <Card id="card-1" className="card" draggable="true">
        <p>Card one</p>
      </Card>
    </Board>

    <Board id="board-2" className="board">
      <Card id="card-2" className="card" draggable="true">
        <p>Card two</p>
      </Card>
    </Board>
  </div>);
};

export default TestDragDrop;
