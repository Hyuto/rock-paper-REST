import React from "react";
import {start, stop, TakeAndPost} from "./scripts/script";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = {
            'canvas': React.createRef(null),
            'video': React.createRef(null),
            'prediction': React.createRef(null)
        }
    }

    render() {
        return (
            <div className="App container">
                <div className="container">
                    <video ref={this.inputRef['video']} autoPlay={true} width="128" height="128"></video>
                    <figure className="figure">
                        <canvas
                            ref={this.inputRef['canvas']}
                            className="figure-img img-fluid rounded"
                            width="128"
                            height="128"></canvas>
                        <figcaption
                            ref={this.inputRef['prediction']}
                            className="figure-caption text-center"></figcaption>
                    </figure>
                </div>
                <div className="container btn-wrapper">
                    <button
                        className="btn btn-dark"
                        onClick={() => start(this.inputRef['video'].current)}>Start</button>
                    <button
                        className="btn btn-dark"
                        onClick={() => stop(
                            this.inputRef['canvas'].current,
                            this.inputRef['video'].current,
                            this.inputRef['prediction'].current
                        )}>Stop</button>
                    <button
                        className="btn btn-dark"
                        onClick={() => TakeAndPost(
                            this.inputRef['canvas'].current,
                            this.inputRef['video'].current,
                            this.inputRef['prediction'].current
                        )}>Take and Predict</button>
                </div>
            </div>
        )
    }
}

export default App;