import React from "react";
import {start, stop, TakeAndPost} from "./scripts/script";

import { Button, CssBaseline, Container, Icon, Typography } from '@material-ui/core';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
        card: {
            maxWidth: 200
        }
    },
    buttons: {
        'text-align': 'center',
        margin: theme.spacing(0.5)
    }
});

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
        const { classes } = this.props;

        return (
            <div className="App">
                <CssBaseline />
                <Container  maxWidth="sm" className={classes.root}>
                    <Container className={classes.cards}>
                        <Card className={classes.cards.card}>
                            <CardActionArea>
                                <video ref={this.inputRef['video']} autoPlay={true} width="128" height="128"></video>
                                <CardContent>
                                    <Typography gutterBottom variant="caption" component="h3">Webcam</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className={classes.cards.card}>
                            <CardActionArea>
                                <canvas ref={this.inputRef['canvas']}
                                    className="figure-img img-fluid rounded"
                                    width="128"
                                    height="128">
                                </canvas>
                                <CardContent>
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
                            endIcon={<Icon>send</Icon>} className={classes.buttons}
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