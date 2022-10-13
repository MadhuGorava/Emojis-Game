// Write your code here.
import './index.css'
import {Component} from 'react'

class EmojiCard extends Component {
  render() {
    const {emoji, onClickEmoji} = this.props
    const {emojiUrl, id, emojiName} = emoji
    const onclickEmojiItem = () => {
      onClickEmoji(id)
    }
    return (
      <li className="emoji-item">
        <button type="button" onClick={onclickEmojiItem}>
          <img
            key={id}
            src={emojiUrl}
            alt={emojiName}
            className="emoji-image"
          />
        </button>
      </li>
    )
  }
}

export default EmojiCard
