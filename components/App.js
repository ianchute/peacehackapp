class App {

  constructor() {

    $.ajaxSetup({
      cache: false
    });

    this.components = []
    this.sentimentContainerManager = new SentimentContainerManager()
    this.simulate() // Testing
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

    })

  }

  simulate() {

    this.update('data/sample0.json')

    setTimeout(() => this.update('data/sample1.json'), 5000)

    setTimeout(() => this.update('data/sample2.json'), 10000)

    setTimeout(() => this.update('data/sample3.json'), 15000)

  }

  listen() {

  }

}
