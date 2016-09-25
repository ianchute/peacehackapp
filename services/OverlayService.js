class OverlayService {

  static overlay(keyword, color) {

    const $relatedTweets = $('#related-tweets').empty()
    const keywordRegex = new RegExp(keyword, 'ig')

    $('.sentiment .post').each((i, elem) => {

      const text = $(elem).data('text')
      const contains = text.search(keyword) !== -1

      if (contains) {
        const $elem = $(elem).clone(true)
        $elem[0].id = Guid.create()
        $elem[0].innerHTML = $elem[0].innerHTML.replace(keywordRegex, (match) =>
          `<b style="color: ${color}; background: ${color === 'red' ? 'pink' : 'lightgreen'};">${match}</b>`)
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
