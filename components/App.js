class App {

  constructor() {

    this.endpoint = 'https://api.social-searcher.com/v2/search?key=0a60e42415f429d286af23eec6b434c5&network=twitter&q='

    this.currentKeyword = ''

    $.ajaxSetup({ cache: false })

    this.components = []
    this.storage = new ObjectStorage()
    this.sentimentContainerManager = new SentimentContainerManager(this.storage)
    this.chartManager = new ChartManager(this.storage)
    this.wordCloudManager = new WordCloudManager(this.storage)

    this.update('data/blank.json')

    //////////////// SIMULATION ////////////////////////////////////////////////////////////////////////
    $(document).off('sentiment.container.widthUpdate.done').on('sentiment.container.widthUpdate.done',
      (e, data) => setTimeout(() => {
        this.wordCloudManager.update(data, 'duterte')
        this.chartManager.update()
      })
    )
    setTimeout(() => this.simulate(), 3000)
    /////////////// END SIMULATION /////////////////////////////////////////////////////////////////////

    // $('.close').click(() => setTimeout(() => $('#related-tweets').empty(), 300))

    // this.listen()

  }

  update(source) {

    console.log(source)

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

    const UPDATE_INTERVAL = 20000

    this.update('data/duterte/sample5.json')
    setTimeout(() => {
      this.update('data/duterte/sample1.json')
      setTimeout(() => {
        this.update('data/duterte/sample3.json')
        setTimeout(() => {
          this.update('data/duterte/sample2.json')
          setTimeout(() => {
            this.update('data/duterte/sample4.json')
            setTimeout(() => this.simulate(), UPDATE_INTERVAL)
          }, UPDATE_INTERVAL)
        }, UPDATE_INTERVAL)
      }, UPDATE_INTERVAL)
    }, UPDATE_INTERVAL)

  }

  listen() {

    $(document).off('sentiment.container.widthUpdate.done').on('sentiment.container.widthUpdate.done',
      (e, data) => setTimeout(() => {
        this.wordCloudManager.update(data, $('#keyword').text())
        this.chartManager.update()
      })
    )

    $('#keyword').change(
      _.throttle(e => {
        this._listen()
      }, 1000)
    )

  }

  _listen() {

    if (this.listener) {
      clearTimeout(this.listener)
    }

    this.listener = setTimeout(() => {

      const keyword = encodeURIComponent( $('#keyword').val().trim().toLocaleLowerCase() )

      console.log(keyword, this.currentKeyword)

      if (keyword && this.currentKeyword !== keyword) {
        this.currentKeyword = keyword
        this.update(this.endpoint + keyword)
      }

    }, 10000)

  }

}
