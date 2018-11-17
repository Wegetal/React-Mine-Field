import React from "react";

class Cell extends React.Component {
  revealField = () => {
    const { value, collumn, line, isBomb, isMarked } = this.props.collumn;
    let { fields, updateFields, makeReload, revealAll } = this.props;
    if (value === 0 && isBomb === false && isMarked === false) {
      this.props.revealBoard(line, collumn);
    } else {
      if (isBomb === false && isMarked === false) {
        fields[line][collumn].isHidden = false;
        updateFields(fields);
        makeReload();
      } else {
        if (isBomb) {
          alert("Game Over");
          revealAll();
          makeReload();
        }
      }
    }
  };
  markField = event => {
    const { isHidden, isMarked, line, collumn } = this.props.collumn;
    let { fields, updateFields, makeReload } = this.props;
    event.preventDefault();

    if (!isHidden) {
      return;
    }
    if (!!isMarked) {
      fields[line][collumn].isMarked = false;
      updateFields(fields);
      makeReload();
    }
    if (!isMarked) {
      fields[line][collumn].isMarked = true;
      updateFields(fields);
      makeReload();
    }
  };
  render() {
    const { value, isBomb, isHidden, isMarked } = this.props.collumn;
    return (
      <div
        style={{
          width: "30px",
          height: "30px",
          border: "1px solid black",
          borderRadius: "5px",
          backgroundColor: "grey",
          lineHeight: "30px"
        }}
        onClick={this.revealField}
        onContextMenu={this.markField}
      >
        {!isHidden ? (!!isBomb ? "💣" : value) : !!isMarked ? "🚩" : null}
      </div>
    );
  }
}

export default Cell;
