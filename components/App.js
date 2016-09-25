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
      (e, data) => requestAnimationFrame(() => this.wordCloudManager.update(data, 'duterte'))
    )
  }

  update(source) {

    $.get(source, data => {

      this.components.forEach(component => component.deleteComponent())

      const tweets = data.posts
        .filter(post => post.sentiment !== 'neutral')
        .filter(post => post.network === 'twitter')
        .map(post => new TweetContainer(post))

      this.components = tweets

      requestAnimationFrame(() => this.sentimentContainerManager.update(data))
      requestAnimationFrame(() => this.chartManager.update())

    })

  }

  simulate() {

    setTimeout(() => this.update('data/duterte/sample2.json'), 6000)

    setTimeout(() => this.update('data/duterte/sample1.json'), 12000)

    setTimeout(() => this.update('data/duterte/sample3.json'), 18000)

    setTimeout(() => this.update('data/duterte/sample4.json'), 24000)

    setTimeout(() => { this.update('data/duterte/sample5.json'); this.simulate() }, 30000)

  }

  listen() {

  }

}
