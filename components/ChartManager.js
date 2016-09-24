class ChartManager {

  constructor(storage) {

    Chart.defaults.global.defaultFontColor = 'white'
    Chart.defaults.global.defaultFontFamily = 'Ubuntu Mono'
    Chart.defaults.global.defaultFontSize = 10
    Chart.defaults.line.gridLines;

    this.storage = storage

    const ctxPositive = $('canvas.positive').get(0).getContext('2d')
    // const ctxNeutral = $('canvas.neutral').get(0).getContext('2d')
    const ctxNegative = $('canvas.negative').get(0).getContext('2d')

    this.$chartjsPositive = new Chart(ctxPositive, {
      type: 'line',
      data: {
        labels: this.storage.get('labels'),
        datasets: [{
          label: 'Positive sentiment over time',
          data: this.storage.get('values').map(value => value.positive),
          borderColor: 'green',
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: 'rgba(0,255,0,0.15)'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 100,
              min: 0,
            }
          }]
        }
      }
    })



    // this.$chartjsNeutral = new Chart(ctxNeutral, {
    //   type: 'line',
    //   data: {
    //     labels: this.storage.get('labels'),
    //     datasets: [{
    //       label: 'Neutral sentiment over time',
    //       data: this.storage.get('values').map(value => value.neutral),
    //       borderColor: 'white',
    //       fill: false,
    //       borderWidth: 2,
    //       pointRadius: 1,
    //       backgroundColor: 'white'
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           max: 100,
    //           min: 0,
    //         }
    //       }]
    //     }
    //   }
    // })

    this.$chartjsNegative = new Chart(ctxNegative, {
      type: 'line',
      data: {
        labels: this.storage.get('labels'),
        datasets: [{
          label: 'Negative sentiment over time',
          data: this.storage.get('values').map(value => value.negative),
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: 'rgba(255,0,0,0.15)'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 100,
              min: 0,
            }
          }]
        }
      }
    })
  }

  update() {

    this.$chartjsPositive.data.labels = this.storage.get('labels')
    this.$chartjsPositive.data.datasets[0].data = this.storage.get('values').map(value => value.positive)
    this.$chartjsPositive.scales["x-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsPositive.scales["y-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsPositive.update()

    // this.$chartjsNeutral.data.labels = this.storage.get('labels')
    // this.$chartjsNeutral.data.datasets[0].data = this.storage.get('values').map(value => value.neutral)
    // this.$chartjsNeutral.update()

    this.$chartjsNegative.data.labels = this.storage.get('labels')
    this.$chartjsNegative.data.datasets[0].data = this.storage.get('values').map(value => value.negative)
    this.$chartjsNegative.scales["x-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsNegative.scales["y-axis-0"].options.gridLines.color = 'rgba(255,255,255,0.1)'
    this.$chartjsNegative.update()

  }

}
