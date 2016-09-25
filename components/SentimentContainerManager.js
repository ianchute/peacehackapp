class SentimentContainerManager {

  constructor(storage) {

    this.storage = storage

    this.$negative = $('.sentiment-negative')
    this.$positive = $('.sentiment-positive')
    this.$none = $('.sentiment-none')

  }

  update(data) {

    const totalPosts = $('.post').length

    const negativePosts = $('.sentiment-negative > .post').length
    const positivePosts = $('.sentiment-positive > .post').length

    const negativePercentageInternal = negativePosts ? (negativePosts / totalPosts * 100) + '%' : 0
    const positivePercentageInternal = positivePosts ? (positivePosts / totalPosts * 100) + '%' : 0

    const negativePercentage = negativePosts ? (negativePosts / totalPosts * 100).toFixed(0) + '%' : 0
    const positivePercentage = positivePosts ? (positivePosts / totalPosts * 100).toFixed(0) + '%' : 0

    if (totalPosts) {
      this.$none.animate({
        width: '0%',
        opacity: 0
      })

      $('.wordcloud > *').animate({ opacity: 0 }, 800)
    }

    if (negativePercentage) {
      this.$negative.animate({
        width: negativePercentageInternal,
        opacity: 1
      }, 800, () => {
        if (window.otherPanelDone) {
          window.otherPanelDone = false
          $(document).trigger('sentiment.container.widthUpdate.done', [data])
        } else {
          window.otherPanelDone = true
        }
      })
    } else {
      this.$negative.animate({
        width: negativePercentage
      }, 1000, () => this.$negative.css({ opacity: 0 }))
    }

    if (positivePercentage) {
      this.$positive.animate({
        width: positivePercentageInternal,
        opacity: 1
      }, 800, () => {
        if (window.otherPanelDone) {
          window.otherPanelDone = false
          $(document).trigger('sentiment.container.widthUpdate.done', [data])
        } else {
          window.otherPanelDone = true
        }
      })
    } else {
      this.$positive.animate({
        width: positivePercentage
      }, 1000, () => this.$positive.css({ opacity: 0 }))
    }

    if (!totalPosts) {
      this.$none.animate({
        width: '100%',
        opacity: 1
      })
    }

    $('.sentiment-negative > h4 > span.percentage').text(negativePercentage + ` - ${negativePosts} Posts`)
    $('.sentiment-positive > h4 > span.percentage').text(positivePercentage + ` - ${positivePosts} Posts`)

    this.store({
      positive: +positivePercentage.toString().replace('%', ''),
      negative: +negativePercentage.toString().replace('%', '')
    })

  }

  pad(str) {
    str = str.toString()
    return '00'.substring(0, 2 - str.length) + str
  }

  store(o) {

    const date = new Date()
    this.storage.get('labels').push(`${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`)
    this.storage.get('values').push(o)

  }

}
