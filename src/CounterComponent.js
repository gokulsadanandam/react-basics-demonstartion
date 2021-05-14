import React from "react";
import Title from "./Title";

export default class CounterComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  increment = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  decrement = () => {
    this.setState({
      counter: this.state.counter - 1
    });
  };

  render() {
    return (
      <Container fluid>
        <div class="row g-3">
          <div class="col">
            <Title title="Counter Component" />
            <button onClick={this.decrement}>-</button>
            <span style={{ paddingLeft: 12, paddingRight: 12 }}>
              {this.state.counter}
            </span>
            <button onClick={this.increment}>+</button>
          </div>
          <div class="col">
            <button onClick={this.reset}>Reset</button>
          </div>
        </div>
      </Container>
    );
  }
}
