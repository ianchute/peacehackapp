class WordCloudManager {

  constructor(storage) {

    this.storage = storage

  }

  update({ posts }, keyword) {

    posts.forEach(post => {
      if (post.sentiment === 'positive') {

        Array.prototype.push.apply(
          this.storage.get('positive_words'),
          WordCleaner.clean(post.text).split(' ')
        )

      } else if (post.sentiment === 'negative') {

        Array.prototype.push.apply(
          this.storage.get('negative_words'),
          WordCleaner.clean(post.text).split(' ')
        )

      }
    })

    const positiveWordList = _.chain(this.storage.get('positive_words'))
      .filter(_.identity)
      .filter(word => window.CommonWords.indexOf(word) === -1)
      .filter(word => word !== keyword)
      .countBy()
      .pairs()
      .map(([key, value]) => ({
        text: key,
        weight: +value
      }))
      .sortBy('weight')
      .last(5)
      .value()

    $('.sentiment-positive .wordcloud')
      .empty()
      .jQCloud(positiveWordList, { height: 200 })

    const negativeWordList = _.chain(this.storage.get('negative_words'))
      .filter(_.identity)
      .filter(word => window.CommonWords.indexOf(word) === -1)
      .filter(word => word !== keyword)
      .countBy()
      .pairs()
      .map(([key, value]) => ({
        text: key,
        weight: +value
      }))
      .sortBy('weight')
      .last(5)
      .value()

    $('.sentiment-negative .wordcloud')
      .empty()
      .jQCloud(negativeWordList, { height: 200 })

  }

}
