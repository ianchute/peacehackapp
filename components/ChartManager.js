class ChartManager {

  constructor(storage) {

    Chart.defaults.global.defaultFontColor = 'white'
    Chart.defaults.global.defaultFontFamily = 'Ubuntu Mono'
    Chart.defaults.global.defaultFontSize = 10

    this.storage = storage

    const ctxPositive = $('canvas.positive').get(0).getContext('2d')
    const ctxNegative = $('canvas.negative').get(0).getContext('2d')
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            max: 100,
            min: 0,
          }
        }]
      }
    }

    this.$chartjsPositive = new Chart(ctxPositive, {
      type: 'line',
      data: {
        labels: this.storage.get('positive_labels'),
        datasets: [{
          label: 'Positive sentiments vs most prominent keyword',
          data: this.storage.get('values').map(value => value.positive),
          borderColor: 'green',
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: 'rgba(0,255,0,0.15)'
        }]
      }, options
    })

    this.$chartjsNegative = new Chart(ctxNegative, {
      type: 'line',
      data: {
        labels: this.storage.get('negative_labels'),
        datasets: [{
          label: 'Negative sentiment vs most prominent keyword',
          data: this.storage.get('values').map(value => value.negative),
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: 'rgba(255,0,0,0.15)'
        }]
      }, options
    })
  }

  update() {

    this.$chartjsPositive.data.labels = this.storage.get('positive_labels')
    this.$chartjsPositive.data.datasets[0].data = this.storage.get('values').map(value => value.positive)
    this.$chartjsPositive.scales["x-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsPositive.scales["y-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsPositive.update()

    this.$chartjsNegative.data.labels = this.storage.get('negative_labels')
    this.$chartjsNegative.data.datasets[0].data = this.storage.get('values').map(value => value.negative)
    this.$chartjsNegative.scales["x-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsNegative.scales["y-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsNegative.update()

  }

}
