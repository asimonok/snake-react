import React, { Component } from 'react'
import Button from 'shared/apps/Button'
import * as styles from './GameStart.module.css'

class GameStart extends Component {
  state = {
    username: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onStartGame = event => {
    event.preventDefault();
    this.props.setUsername(this.state.username);
    this.props.startGame();
  }

  render () {
    return (
      <div className={styles.root}>
        <h1 className={styles.header}>Snake</h1>
        <form className={styles.form} onSubmit={this.onStartGame}>
          <input type='text' value={this.state.username} onChange={this.onChangeUsername} className={styles.input} placeholder='Username' />
          <Button fluid size='large'>Start</Button>
        </form>
      </div>
    )
  }
}

export default GameStart
