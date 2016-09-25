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

    const cloudExists = $('.wordcloud').hasClass('jqcloud')

    if (cloudExists) {
      $('.sentiment-positive .wordcloud').jQCloud('update',
        positiveMinimum <= 1
          ? normalizedPositiveWordList
          : positiveWordList)
    } else {
      $('.sentiment-positive .wordcloud').jQCloud(
        positiveMinimum <= 1
          ? normalizedPositiveWordList
          : positiveWordList, { height: 300, delay: 100 })
    }


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

    if (cloudExists) {
      $('.sentiment-negative .wordcloud').jQCloud('update',
          negativeMinimum <= 1
          ? normalizedNegativeWordList
          : negativeWordList)
    } else {
      $('.sentiment-negative .wordcloud').jQCloud(
          negativeMinimum <= 1
          ? normalizedNegativeWordList
          : negativeWordList, { height: 300, delay: 100 })
    }


    this.storage.get('positive_labels')
      .push(positiveWordList[0].text)

    this.storage.get('negative_labels')
      .push(negativeWordList[0].text)

  }

}