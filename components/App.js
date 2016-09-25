class App {

  constructor() {

    $.ajaxSetup({ cache: false })

    this.components = []
    this.storage = new ObjectStorage()
    this.sentimentContainerManager = new SentimentContainerManager(this.storage)
    this.chartManager = new ChartManager(this.storage)
    this.wordCloudManager = new WordCloudManager(this.storage)

    this.update('data/blank.json')

    setTimeout(() => this.simulate(), 1000) // Testing
    // this.listen() // Production

    $(document).on('sentiment.container.widthUpdate.done',
      (e, data) => setTimeout(() => {
        this.wordCloudManager.update(data, 'duterte')
        this.chartManager.update()
      })
    )

    $('.close').click(() => setTimeout(() => $('#related-tweets').empty(), 300))
  }

  update(source) {

    $.get(source, data => {

      this.components.forEach(component => component.deleteComponent())

      const tweets = data.posts
        .filter(post => post.lang === 'en' || post.lang === 'tl')
        .filter(post => post.sentiment !== 'neutral')
        .filter(post => post.network === 'twitter')
        .map(post => new TweetContainer(post))

      this.components = tweets

      setTimeout(() => this.sentimentContainerManager.update(data))

    })

  }

  simulate() {

    setTimeout(() => this.update('data/duterte/sample4.json'), 10000)

    setTimeout(() => this.update('data/duterte/sample1.json'), 20000)

    setTimeout(() => this.update('data/duterte/sample3.json'), 30000)

    setTimeout(() => this.update('data/duterte/sample2.json'), 40000)

    setTimeout(() => { this.update('data/duterte/sample5.json'); this.simulate() }, 50000)

  }

  listen() {

  }

}
