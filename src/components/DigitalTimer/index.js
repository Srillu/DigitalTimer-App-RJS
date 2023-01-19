// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {initialMinutes: 25, iconClicked: false, initialSeconds: 0}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  clickIconChange = () => {
    const {iconClicked} = this.state
    this.setState({iconClicked: !iconClicked})
  }

  onPlusClicked = () => {
    this.setState(prevState => ({initialMinutes: prevState.initialMinutes + 1}))
  }

  onMinusClicked = () => {
    const {initialMinutes} = this.state

    if (initialMinutes > 1) {
      this.setState(prevState => ({
        initialMinutes: prevState.initialMinutes - 1,
      }))
    }
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementSeconds = () => {
    const {initialMinutes, initialSeconds} = this.state

    const timerCompleted = initialSeconds === initialMinutes * 60

    if (timerCompleted) {
      this.clearTimerInterval()
      this.setState({iconClicked: false})
    } else {
      this.setState(prevState => ({
        initialSeconds: prevState.initialSeconds + 1,
      }))
    }
  }

  startOrPauseClicked = () => {
    const {initialMinutes, iconClicked, initialSeconds} = this.state

    const timerCompleted = initialSeconds === initialMinutes * 60

    if (timerCompleted) {
      this.setState({initialSeconds: 0})
    }
    if (iconClicked) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementSeconds, 1000)
    }
    this.setState(prevState => ({iconClicked: !prevState.iconClicked}))
  }

  getSecondsInTimeFormat = () => {
    const {initialMinutes, initialSeconds} = this.state

    const remainingSeconds = initialMinutes * 60 - initialSeconds

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {initialMinutes, iconClicked, initialSeconds} = this.state
    const isButtonDisabled = initialSeconds > 0
    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="image-bg-container">
            <div className="image-timer">
              <h1 className="running-time">{this.getSecondsInTimeFormat()}</h1>
              <p className="ps">{iconClicked ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div>
            <div className="btn-container">
              <button
                type="button"
                className="icons-btn"
                onClick={this.startOrPauseClicked}
              >
                <img
                  className="icons"
                  alt={iconClicked ? 'pause icon' : 'play icon'}
                  src={
                    iconClicked
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                />
                {iconClicked ? 'Pause' : 'Start'}
              </button>
              <button
                className="icons-btn"
                type="button"
                onClick={this.onReset}
              >
                <img
                  className="icons"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                Reset
              </button>
            </div>
            <div>
              <p className="name">Set Timer Limit</p>
              <div className="minus-plus-container">
                <button
                  className="minus-plus-btns"
                  type="button"
                  onClick={this.onMinusClicked}
                  disabled={isButtonDisabled}
                >
                  -
                </button>
                <p type="button" className="timer">
                  {initialMinutes}
                </p>
                <button
                  className="minus-plus-btns"
                  type="button"
                  onClick={this.onPlusClicked}
                  disabled={isButtonDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
