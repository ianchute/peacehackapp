class SentimentContainerManager {

  constructor(storage) {

    this.storage = storage

    this.$negative = $('.sentiment-negative')
    this.$neutral = $('.sentiment-neutral')
    this.$positive = $('.sentiment-positive')

    this.$none = $('.sentiment-none')

  }

  update() {

    const totalPosts = $('.post').length

    const negativePosts = $('.sentiment-negative > .post').length
    const neutralPosts = $('.sentiment-neutral > .post').length
    const positivePosts = $('.sentiment-positive > .post').length

    const negativePercentage = negativePosts ? (negativePosts / totalPosts * 100).toFixed(0) + '%' : 0
    const neutralPercentage = neutralPosts ? (neutralPosts / totalPosts * 100).toFixed(0) + '%' : 0
    const positivePercentage = positivePosts ? (positivePosts / totalPosts * 100).toFixed(0) + '%' : 0

    if (totalPosts) {
      this.$none.animate({
        width: '0%',
        opacity: 0
      })
    }

    if (negativePercentage) {
      this.$negative.animate({
        width: negativePercentage,
        opacity: 1
      }, 1000)
    } else {
      this.$negative.animate({
        width: negativePercentage
      }, 1000, () => this.$negative.css({ opacity: 0 }))
    }

    if (neutralPercentage) {
      this.$neutral.animate({
        width: neutralPercentage,
        opacity: 1,
        display: 'initial'
      }, 1000)
    } else {
      this.$neutral.animate({
        width: negativePercentage
      }, 1000, () => this.$neutral.css({ opacity: 0, display: 'none' }))
    }

    if (positivePercentage) {
      this.$positive.animate({
        width: positivePercentage,
        opacity: 1
      }, 1000)
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
    $('.sentiment-neutral > h4 > span.percentage').text(neutralPercentage + ` - ${neutralPosts} Posts`)
    $('.sentiment-positive > h4 > span.percentage').text(positivePercentage + ` - ${positivePosts} Posts`)

    this.store({
      positive: +positivePercentage.toString().replace('%', ''),
      neutral: +neutralPercentage.toString().replace('%', ''),
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
