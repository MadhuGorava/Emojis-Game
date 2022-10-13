/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import './index.css'
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    clickedEmojis: [],
    isGameEnd: false,
    score: 0,
    topScore: 0,
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  onClickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojis} = this.state
    const isPresent = clickedEmojis.includes(id)
    if (isPresent) {
      this.finishGameAndSetTopScore(clickedEmojis.length)
    } else {
      if (emojisList.length - 1 === clickedEmojis.length) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojis: [...prevState.clickedEmojis, id],
      }))
    }
  }

  finishGameAndSetTopScore = () => {
    const {score, topScore} = this.state
    if (score > topScore) {
      this.setState({topScore: score})
    }
    this.setIsGameEnd(true)
  }

  restartGame = () => {
    this.setState({clickedEmojis: []})
    this.setIsGameEnd(false)
  }

  setIsGameEnd = value => {
    this.setState({isGameEnd: value})
  }

  renderWinOrLose = () => {
    const {emojisList} = this.props
    const {clickedEmojis} = this.state
    const isWon = emojisList.length === clickedEmojis.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.restartGame}
        score={clickedEmojis.length}
      />
    )
  }

  renderEmojiList = () => {
    const shuffledEmojiList = this.getShuffledEmojisList()
    return (
      <ul className="emoji-list">
        {shuffledEmojiList.map(emojiItem => (
          <EmojiCard
            key={emojiItem.id}
            emoji={emojiItem}
            onClickEmoji={this.onClickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isGameEnd, clickedEmojis, topScore} = this.state
    const currentScore = clickedEmojis.length
    return (
      <div className="app-container">
        <NavBar
          currentScore={currentScore}
          topScore={topScore}
          isGameEnd={isGameEnd}
        />
        <div className="emoji-body-container">
          {isGameEnd ? this.renderWinOrLose() : this.renderEmojiList()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
