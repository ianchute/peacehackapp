class TweetContainer {

  constructor({ url, sentiment, text, posted, lang, user: { name, image } }, keyword = 'Duterte') {

    this.id = Guid.create()
    this.keywordRegex = new RegExp(keyword, 'ig')
    this.keywordElem = `<b class="keyword">${keyword}</b>`

    const container = `.sentiment-${sentiment}`

    // const encodedUrl = encodeURIComponent(url)
    // const $elem = $(`<iframe
    //   id="${this.id}"
    //   class="post"
    //   border=0
    //   frameborder=0
    //   height="100%"
    //   width="100%"
    //   style="overflow:hidden;height:100%;width:100%"
    //   src="http://twitframe.com/show?url=${encodedUrl}">
    //   </iframe>`
    // )

    const $elem = $(`<div id=${this.id} class="post" style="display:none">
      <img src="${image}" class="avatar"/>
      <b>${name}</b> - ${window.Languages[lang] || `Unknown(${lang})`}
      <br><br>
      ${text.replace(this.keywordRegex, this.keywordElem)}
      <hr>
    </div>`)

    $elem.click(e => window.open(url, '_blank'))

    $(container).append($elem)

    $elem.animate({ opacity: 1 }, 500)
  }

  deleteComponent() {
    $(`#${this.id}`).fadeOut(() => $(`#${this.id}`).remove())
  }

}
