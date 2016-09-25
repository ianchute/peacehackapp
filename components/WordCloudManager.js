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
      .filter(word => !word.startsWith('http'))
      .countBy()
      .pairs()
      .map(([key, value]) => ({
        text: key,
        weight: +value
      }))
      .sortBy('weight')
      .last(20)
      .value()
      .reverse()

    const positiveMinimum = _(positiveWordList).last(1).map(word => word.weight) - 1

    const normalizedPositiveWordList = positiveWordList.map(word => ({
      text: word.text,
      weight: word.weight - positiveMinimum
    }))

    $('.sentiment-positive .wordcloud')
      .jQCloud('destroy')
      .jQCloud(normalizedPositiveWordList, { height: 300 })

    const negativeWordList = _.chain(this.storage.get('negative_words'))
      .filter(_.identity)
      .filter(word => window.CommonWords.indexOf(word) === -1)
      .filter(word => word !== keyword)
      .filter(word => !word.startsWith('http'))
      .countBy()
      .pairs()
      .map(([key, value]) => ({
        text: key,
        weight: +value
      }))
      .sortBy('weight')
      .last(20)
      .value()
      .reverse()

    const negativeMinimum = _(negativeWordList).last(1).map(word => word.weight) - 1

    const normalizedNegativeWordList = negativeWordList.map(word => ({
      text: word.text,
      weight: word.weight - negativeMinimum
    }))

    $('.sentiment-negative .wordcloud')
      .jQCloud('destroy')
      .jQCloud(normalizedNegativeWordList, { height: 300 })

  }

}
