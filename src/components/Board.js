import React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Cell from "./Cell";
class Board extends React.Component {
  state = {
    fields: null
  };
  componentDidMount() {
    this.buildBoard();
  }
  buildBoard = () => {
    const { width, heigth, mines } = this.props;
    let array = new Array(heigth);
    for (let line = 0; line < heigth; line++) {
      array[line] = new Array(width);
      for (let collumn = 0; collumn < width; collumn++) {
        array[line][collumn] = {
          line: line,
          collumn: collumn,
          isHidden: true,
          isBomb: false,
          isMarked: false,
          value: 0
        };
      }
    }
    let mineHeigth;
    let mineWidth;
    for (let i = 1; i <= mines; i++) {
      mineWidth = Math.floor(Math.random() * (width - 0)) + 0;
      mineHeigth = Math.floor(Math.random() * (heigth - 0)) + 0;
      array[mineHeigth][mineWidth].isBomb = true;
    }

    for (let line = 0; line < heigth; line++) {
      for (let collumn = 0; collumn < width; collumn++) {
        if (!array[line][collumn].isBomb) {
          let countBomb = 0;
          let around = this.checkBoard(line, collumn, array);
          around.forEach(value => {
            if (value.isBomb) {
              countBomb++;
            }
          });
          array[line][collumn].value = countBomb;
        }
      }
    }
    this.props.updateFields(array);
  };
  checkBoard = (line, collumn, array = []) => {
    const { heigth, width } = this.props;
    const aux = [];
    if (line > 0) {
      aux.push(array[line - 1][collumn]);
    }
    if (line < heigth - 1) {
      aux.push(array[line + 1][collumn]);
    }
    if (collumn > 0) {
      aux.push(array[line][collumn - 1]);
    }
    if (collumn < width - 1) {
      aux.push(array[line][collumn + 1]);
    }
    if (line > 0 && collumn > 0) {
      aux.push(array[line - 1][collumn - 1]);
    }
    if (line > 0 && collumn < width - 1) {
      aux.push(array[line - 1][collumn + 1]);
    }
    if (line < heigth - 1 && collumn < width - 1) {
      aux.push(array[line + 1][collumn + 1]);
    }
    if (line < heigth - 1 && collumn > 0) {
      aux.push(array[line + 1][collumn - 1]);
    }
    return aux;
  };
  checkGameStatus = () => {
    const { fields } = this.props;

    let gameStatus = fields.every(lines => {
      return !lines.some(collumn => {
        if (!collumn.isBomb) {
          if (!!collumn.isHidden) {
            return true;
          } else {
            return false;
          }
        } else {
          if (!collumn.isMarked) {
            return true;
          } else {
            return false;
          }
        }
      });
    });

    if (gameStatus) {
      alert("You Won the Game");
    }
  };

  revealBoard = (line, collumn) => {
    let { updateFields, fields } = this.props;
    fields[line][collumn].isHidden = false;
    updateFields(fields);
    let aux = this.checkBoard(line, collumn, fields);
    aux.forEach(value => {
      if (!!value.isHidden && (value.value === 0 && !value.isBomb)) {
        fields[value.line][value.collumn].isHidden = false;
        updateFields(fields);
        this.revealBoard(value.line, value.collumn);
      }
    });
    updateFields(fields);
    this.makeReload();
  };
  makeReload = () => {
    this.setState({ reload: true });
  };
  revealAll = () => {
    let { fields, updateFields } = this.props;
    fields.forEach((line, index) => {
      line.forEach((collumn, i) => {
        fields[index][i].isHidden = false;
        updateFields(fields);
        this.makeReload();
      });
    });
  };
  render() {
    const { fields, updateFields } = this.props;
    if (!!fields.length > 0) {
      this.checkGameStatus();
    }
    return (
      <div
        style={{
          display: "inline-block",
          marginTop: "15px",
          marginBottom: "15px"
        }}
      >
        <Grid container>
          {!!fields &&
            fields.map((line, index) => (
              <Grid key={index} item>
                {line.map((collumn, i) => (
                  <Cell
                    checkGameStatus={this.checkGameStatus}
                    updateFields={updateFields}
                    makeReload={this.makeReload}
                    revealAll={this.revealAll}
                    fields={fields}
                    key={i}
                    line={index}
                    horizontal={i}
                    collumn={collumn}
                    revealBoard={this.revealBoard}
                  />
                ))}
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  fields: state.mineState.fields
});
const mapDispatchToProps = dispatch => ({
  updateFields: fields => dispatch({ type: "UPDATE_FIELD_ON_REVEAL", fields })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
