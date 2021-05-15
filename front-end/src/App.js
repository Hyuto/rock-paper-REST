import React, { useRef } from "react";
import { start } from "./scripts/script";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = {
      'canvas' : useRef(null),
      'video' : useRef(null),
      'prediction' : useRef(null)
    }
  }

  render() {
    /* const script = new RockPaperScissor(
      this.inputRef['video'].current,
      this.inputRef['canvas'].current,
      this.inputRef['prediction'].current
    ) */

    return (
        <div className="App container">
            <div className="container">
                <video ref={this.inputRef['video']} autoPlay={true} width="128" height="128"></video>
                <figure className="figure">
                    <canvas ref={this.inputRef['canvas']} className="figure-img img-fluid rounded" width="128" height="128"></canvas>
                    <figcaption ref={this.inputRef['prediction']}  className="figure-caption text-center"></figcaption>
                </figure>
            </div>
            <div className="container btn-wrapper">
                <button className="btn btn-dark" onClick={start(this.inputRef['video'].current)}>Start</button>
                <button className="btn btn-dark">Stop</button>
                <button className="btn btn-dark">Take and Predict</button>
            </div>
        </div>
    )
  }
}

export default App;