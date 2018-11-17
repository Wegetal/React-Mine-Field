import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Button, Grid, TextField } from "@material-ui/core";
import appReducer from "./store";
// import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";
const store = createStore(appReducer);
class App extends Component {
  state = {
    start: false,
    mines: 0
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  startGame = () => {
    const { mines } = this.state;
    if (mines > 0 && mines < 100) {
      this.setState({ start: true });
    } else {
      alert("Numero invalido");
    }
  };
  render() {
    const { mines, start } = this.state;
    return (
      <div className="App" style={{ marginTop: "10px" }}>
        <Grid container direction={"row"}>
          <Grid xs={12} md={12} item>
            <TextField
              style={{ height: "36px" }}
              variant="outlined"
              type="number"
              name={"mines"}
              value={mines}
              onChange={this.handleChange}
              placeholder={"Digite o numero de minas"}
            />
            <Button
              style={{
                marginLeft: "12px",
                backgroundColor: "#4f92ff",
                borderRadius: "15px"
              }}
              onClick={this.startGame}
            >
              Start
            </Button>
          </Grid>
          <Grid xs={12} md={12} item style={{ textAlign: "center" }}>
            {start && (
              <Provider store={store}>
                <Board width={10} heigth={10} mines={mines} />
              </Provider>
            )}
          </Grid>
          <Grid xs={12} md={12} item>
            {start && (
              <Button
                style={{
                  marginLeft: "12px",
                  backgroundColor: "#4f92ff",
                  borderRadius: "15px"
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Restart
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
