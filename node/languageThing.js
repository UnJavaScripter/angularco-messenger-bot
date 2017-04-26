class languageThing {
  constructor() {
    this.KEYWORDS = {
      TIME_QUESTION: [
        "cuando"
      ],
      FUTURE_ADVERB: [
        "proximo",
        "siguiente",
        "otro",
        "futuro"
      ],
      EVENT_SUBJECT: [
        "meetup",
        "evento",
        "reuion",
        "charla",
        "taller",
        "workshop"
      ],
      QUESTION_MARK: [
        "?"
      ]
    };
  }

  process(messageText) {
    let result = [];
    const messageWordsArr = messageText.match(/(\w|\w\?)+(?=\s|\?)|(\?(?!\w))/gi);
    if(messageWordsArr) {
      messageWordsArr.map(word => {
        for (let group in this.KEYWORDS) {
          if (this.KEYWORDS[group].indexOf(word) !== -1) {
            return result.push(group);
          }
        }
        return result.push('filler');
      })
      return result;
    }
    return [];
  }

  isNextMeetupQuestion(messageText) {
    const messageArr = this.process(messageText);
    if(messageArr.length) {
      let response = messageArr.filter(word => word !== 'filler');
      if(response.length >= Object.keys(this.KEYWORDS).length - 1) {
        return true;
      } else {
        return false;
      }
    }else {
      return false;
    }
  }

}

module.exports = new languageThing();
module.exports.default = module.exports;