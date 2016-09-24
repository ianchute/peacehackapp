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
  }

  update(source) {

    $.get(source, data => {

      this.components.forEach(component => component.deleteComponent())

      const tweets = data.posts
        .filter(post => post.sentiment !== 'neutral')
        .filter(post => post.network === 'twitter')
        .map(post => new TweetContainer(post))

      this.components = tweets

      this.sentimentContainerManager.update()
      this.chartManager.update()
      this.wordCloudManager.update(data, 'duterte')

    })

  }

  simulate() {

    setTimeout(() => this.update('data/duterte/sample1.json'), 3000)

    setTimeout(() => this.update('data/duterte/sample2.json'), 6000)

    setTimeout(() => this.update('data/duterte/sample3.json'), 9000)

    setTimeout(() => this.update('data/duterte/sample4.json'), 12000)

    setTimeout(() => { this.update('data/duterte/sample5.json'); this.simulate() }, 15000)

  }

  listen() {

  }

}
