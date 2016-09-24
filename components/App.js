class App {

  constructor() {

    $.ajaxSetup({
      cache: false
    });

    this.components = []
    this.storage = new ObjectStorage()
    this.sentimentContainerManager = new SentimentContainerManager(this.storage)
    this.chartManager = new ChartManager(this.storage)

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

    })

  }

  simulate() {

    setTimeout(() => this.update('data/duterte/sample1.json'), 3000)

    setTimeout(() => this.update('data/duterte/sample2.json'), 6000)

    setTimeout(() => { this.update('data/duterte/sample3.json'); this.simulate() }, 9000)

  }

  listen() {

  }

}
