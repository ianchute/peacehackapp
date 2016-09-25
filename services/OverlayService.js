class OverlayService {

  static overlay(keyword) {

    const $relatedTweets = $('#related-tweets').empty()

    $('.sentiment .post').each((i, elem) => {

      const text = $(elem).data('text')
      const contains = text.search(keyword) !== -1

      if (contains) {
        const $elem = $(elem).clone(true)
        $elem[0].id = Guid.create()
        $relatedTweets.append($elem[0])
      }

    })

    setTimeout(() => {
      $('#modalLauncher').click()
      $('#related-tweets > .post').css({ display: 'block' })
      $('#related-tweets > .post').animate({ opacity: 1 }, 500)
    }, 100)

  }

}
