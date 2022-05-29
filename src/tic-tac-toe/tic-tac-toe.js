import React from 'react';
import './../css/main-page.css';
import swal from 'sweetalert';
import { HotKeys } from "react-hotkeys";


class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.winningCombinations = [[11, 12, 13], [21, 22, 23], [31, 32, 33], [11, 21, 31],
        [12, 22, 32], [13, 23, 33], [11, 22, 33], [31, 22, 13]];
        this.state = {
            gameOver: false,
            oPlaying: false,
            keyboardPosition: 11,
            moving: "",
            usingKeyboard: false,
            buttons: [
                {
                    id: 11,
                    status: false,
                    shape: "",
                },
                {
                    id: 12,
                    status: false,
                    shape: "",
                },
                {
                    id: 13,
                    status: false,
                    shape: "",
                },
                {
                    id: 21,
                    status: false,
                    shape: "",
                },
                {
                    id: 22,
                    status: false,
                    shape: "",
                },
                {
                    id: 23,
                    status: false,
                    shape: "",
                },
                {
                    id: 31,
                    status: false,
                    shape: "",
                },
                {
                    id: 32,
                    status: false,
                    shape: "",
                },
                {
                    id: 33,
                    status: false,
                    shape: "",
                },
            ]
        }

        this.play = this.play.bind(this);
        this.restart = this.restart.bind(this);

    };


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    contains(buttonShape, combination) {
        return (buttonShape.includes(combination[0]) &&
            buttonShape.includes(combination[1]) &&
            buttonShape.includes(combination[2]));
    }

    winner(buttonShape) {
        let win = this.winningCombinations.filter(win => {
            return this.contains(buttonShape, win);
        })

        return (win.length > 0);
    }

    winShapeO(buttons, shape) {
        let buttonO = buttons.filter((button) => button.shape === shape).map(btn => { return btn.id });
        if (this.winner(buttonO)) {
            this.setState({
                gameOver: true,
            })
            this.displayPopUp(shape);
            return true;
        }else{
            return false;
        }
    }

    noWinner(buttons, winner) {
        let availableSpaces = buttons.filter(button => button.status === false);
        if(availableSpaces.length === 0 && !winner){
            this.setState({
                gameOver: true,
            })
            swal("No winner");
            return true;
        }else{
            return false;
        }
    }

    generateRandom(buttons) {
        let availableSpaces = buttons.filter(button => button.status === false);
        const min = 0;
        const max = availableSpaces.length;
        const rand = min + Math.floor(Math.random() * (max - min));

        return availableSpaces[rand];
    }

    setButton(buttonId) {
        let buttonsTemp = this.state.buttons;
        let buttonTemp = buttonsTemp.find(button => button.id === buttonId);
        let oPlayingTemp = false;

        if (!buttonTemp.status) {
            buttonTemp.shape = "x";
            buttonTemp.status = true;
            oPlayingTemp = true;
            this.setState({
                buttons: buttonsTemp,
                oPlaying: oPlayingTemp
            })
            
            let winner = this.winShapeO(this.state.buttons, "x");
            let noWinner = this.noWinner(buttonsTemp, winner);

            console.log(noWinner);

            if (!winner) {
                buttonTemp = this.generateRandom(this.state.buttons);
                setTimeout(() => {
                    buttonTemp.shape = "o";
                    buttonTemp.status = true;
                    oPlayingTemp = false;
                    this.setState({
                        buttons: buttonsTemp,
                        oPlaying: oPlayingTemp
                    })
                    this.winShapeO(this.state.buttons, "o");
                }, 1000);
            }
        }else{
            swal("Por favor elija otra celda");
        }
    }

    displayPopUp(shape) {
        swal("Player " + shape + " win.");
    }

    play(button) {
        console.log("Hola, playing");
        this.setButton(button);
    }

    setKeyPosition(position) {
        this.setState({
            keyboardPosition: position
        });
    }

    moveRight() {
        if (this.state.keyboardPosition === 11) {
            this.setState({
                keyboardPosition: 12
            });
        } else if (this.state.keyboardPosition === 12) {
            this.setState({
                keyboardPosition: 13
            })
        } else if (this.state.keyboardPosition === 21) {
            this.setState({
                keyboardPosition: 22
            })
        } else if (this.state.keyboardPosition === 22) {
            this.setState({
                keyboardPosition: 23
            })
        } else if (this.state.keyboardPosition === 31) {
            this.setState({
                keyboardPosition: 32
            })
        } else if (this.state.keyboardPosition === 32) {
            this.setState({
                keyboardPosition: 33
            })
        }
    }

    moveLeft() {
        if (this.state.keyboardPosition === 33) {
            this.setState({
                keyboardPosition: 32
            });
        } else if (this.state.keyboardPosition === 32) {
            this.setState({
                keyboardPosition: 31
            })
        } else if (this.state.keyboardPosition === 23) {
            this.setState({
                keyboardPosition: 22
            })
        } else if (this.state.keyboardPosition === 22) {
            this.setState({
                keyboardPosition: 21
            })
        } else if (this.state.keyboardPosition === 13) {
            this.setState({
                keyboardPosition: 12
            })
        } else if (this.state.keyboardPosition === 12) {
            this.setState({
                keyboardPosition: 11
            })
        }
    }

    moveDown() {
        if (this.state.keyboardPosition === 11) {
            this.setState({
                keyboardPosition: 21
            });
        } else if (this.state.keyboardPosition === 21) {
            this.setState({
                keyboardPosition: 31
            })
        } else if (this.state.keyboardPosition === 12) {
            this.setState({
                keyboardPosition: 22
            })
        } else if (this.state.keyboardPosition === 22) {
            this.setState({
                keyboardPosition: 32
            })
        } else if (this.state.keyboardPosition === 13) {
            this.setState({
                keyboardPosition: 23
            })
        } else if (this.state.keyboardPosition === 23) {
            this.setState({
                keyboardPosition: 33
            })
        }
    }

    moveUp() {
        if (this.state.keyboardPosition === 31) {
            this.setState({
                keyboardPosition: 21
            });
        } else if (this.state.keyboardPosition === 21) {
            this.setState({
                keyboardPosition: 11
            })
        } else if (this.state.keyboardPosition === 32) {
            this.setState({
                keyboardPosition: 22
            })
        } else if (this.state.keyboardPosition === 22) {
            this.setState({
                keyboardPosition: 12
            })
        } else if (this.state.keyboardPosition === 33) {
            this.setState({
                keyboardPosition: 23
            })
        } else if (this.state.keyboardPosition === 23) {
            this.setState({
                keyboardPosition: 13
            })
        }
    }

    move(direction) {
        console.log(direction);
        if (direction === 39) {
            this.moveRight()
        } else if (direction === 37) {
            this.moveLeft();
        } else if (direction === 40) {
            this.moveDown();
        } else if (direction === 38) {
            this.moveUp();
        }
    }


    keyBoard(keyName) {

        if (keyName.keyCode === 38 || keyName.keyCode === 37 || keyName.keyCode === 39 || keyName.keyCode === 40 || keyName.keyCode === 13) {
            this.setState({
                moving: keyName.keyCode
            });
            if (!this.state.usingKeyboard) {
                this.setState({
                    usingKeyboard: true,
                    keyboardPosition: 11
                })

            } else {
                if (keyName.keyCode === 13) {
                    this.play(this.state.keyboardPosition);
                } else {
                    this.move(keyName.keyCode);
                }

            }
        }

    }


    restart() {
        this.setState({
            gameOver: false,
            oPlaying: false,
            buttons: [
                {
                    id: 11,
                    status: false,
                    shape: "",
                },
                {
                    id: 12,
                    status: false,
                    shape: "",
                },
                {
                    id: 13,
                    status: false,
                    shape: "",
                },
                {
                    id: 21,
                    status: false,
                    shape: "",
                },
                {
                    id: 22,
                    status: false,
                    shape: "",
                },
                {
                    id: 23,
                    status: false,
                    shape: "",
                },
                {
                    id: 31,
                    status: false,
                    shape: "",
                },
                {
                    id: 32,
                    status: false,
                    shape: "",
                },
                {
                    id: 33,
                    status: false,
                    shape: "",
                },
            ]
        })
    }

    render() {
        const { keyboardPosition, usingKeyboard } = this.state;
        return (
            <HotKeys
                keyName="left, right, down, up, enter, space"
                onKeyDown={this.keyBoard.bind(this)}
            >
                <div className="principal-page">
                    <div className="table-game">
                        <div className="first-row row">
                            {
                                this.state.buttons.filter((button) => button.id < 14).map((element) =>
                                    <div key={element.id}>
                                        <button id={element.id} className={(usingKeyboard && keyboardPosition === element.id) ? "button-size button-border" : "button-size"} onClick={() => this.play(element.id)} disabled={this.state.oPlaying || this.state.gameOver}>
                                            <span className="shape">{element.shape}</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="second-row row">
                            {
                                this.state.buttons.filter((button) => (button.id > 14 && button.id < 24)).map((element) =>
                                    <div key={element.id}>
                                        <button id={element.id} className={(usingKeyboard && keyboardPosition === element.id) ? "button-size button-border" : "button-size"} onClick={() => this.play(element.id)} disabled={this.state.oPlaying || this.state.gameOver}>
                                            <span className="shape">{element.shape}</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="third-row row">
                            {
                                this.state.buttons.filter((button) => (button.id > 24 && button.id < 34)).map((element) =>
                                    <div key={element.id}>
                                        <button id={element.id} className={(usingKeyboard && keyboardPosition === element.id) ? "button-size button-border" : "button-size"} onClick={() => this.play(element.id)} disabled={this.state.oPlaying || this.state.gameOver}>
                                            <span className="shape">{element.shape}</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <br />
                    <div>
                        <button onClick={() => this.restart()} disabled={!this.state.gameOver}>
                            <span className="shape">Play again</span>
                        </button>
                    </div>
                    <div>
                        <p id="test">I'm moving with keyboard to {this.state.moving}</p>
                        <p> Key board en button {this.state.keyboardPosition}</p>
                    </div>
                </div>
            </HotKeys>
        )
    }
}
export default TicTacToe;