import React from "react";
import {start, stop, TakeAndPost} from "./scripts/script";

import { Button, CssBaseline, Container, Typography } from '@material-ui/core';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';

const useStyles = theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center'
    },
    cards: {
        display: 'flex',
        'justify-content': 'center',
    },
    buttons: {
        'text-align': 'center',
        margin: theme.spacing(0.5)
    },
    center: {
        'text-align': 'center',
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = {
            'canvas': React.createRef(null),
            'video': React.createRef(null),
            'prediction': React.createRef(null)
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="App">
                <CssBaseline />
                <Container  maxWidth="sm" className={classes.root}>
                    <Typography variant="h5" style={{margin: 5}}>Rock-Paper-Scissor Detector</Typography>
                    <Container className={classes.cards}>
                        <Card style={{maxWidth: 128, margin: 5}}>
                            <CardActionArea>
                                <video ref={this.inputRef['video']} autoPlay={true} width="128" height="128"></video>
                                <CardContent className={classes.center}>
                                    <Typography gutterBottom variant="caption"><strong>Webcam</strong></Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card style={{maxWidth: 128, margin: 5}}>
                            <CardActionArea>
                                <canvas ref={this.inputRef['canvas']}
                                    className="figure-img img-fluid rounded"
                                    width="128"
                                    height="128">
                                </canvas>
                                <CardContent className={classes.center}>
                                    <Typography gutterBottom variant="caption" component="p" ref={this.inputRef['prediction']}></Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Container>
                    <Container className={classes.buttons}>
                        <Button variant="contained" className={classes.buttons}
                            onClick={() => start(this.inputRef['video'].current)}>
                                Start
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.buttons}
                            onClick={() => stop(
                                this.inputRef['canvas'].current,
                                this.inputRef['video'].current,
                                this.inputRef['prediction'].current
                            )}>
                                Stop
                        </Button>
                        <Button variant="contained" color="primary" 
                            endIcon={<SendIcon />} className={classes.buttons}
                            onClick={() => TakeAndPost(
                                this.inputRef['canvas'].current,
                                this.inputRef['video'].current,
                                this.inputRef['prediction'].current
                            )}>
                                Take and Predict
                        </Button>
                    </Container>
                </Container>
            </div>
        )
    }
}

export default withStyles(useStyles)(App);