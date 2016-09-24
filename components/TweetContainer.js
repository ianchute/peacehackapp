class TweetContainer {

  constructor({ url, sentiment, text, user: { name, image } }) {

    this.id = Guid.create()

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

    const $elem = $(`<div id=${this.id} class="post"><img src="${image}" class="avatar"/> <b>${name}:</b> ${text}<hr></div>`)

    $(container).append($elem)

    $elem.animate({ opacity: 1 }, 500)
  }

  deleteComponent() {
    $(`#${this.id}`).fadeOut(() => $(`#${this.id}`).remove())
  }
}
