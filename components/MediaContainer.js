class MediaContainer {

  constructor(url, container) {

    this.id = Guid.create()

    const $elem = $(`<iframe
      id="${this.id}"
      border=0
      frameborder=0
      height="100%"
      width="100%"
      style="overflow:hidden;height:100%;width:100%"
      src="${url}">
      </iframe>`
    )

    $(container).append($elem)
  }

  deleteComponent() {
    $(`#${this.id}`).remove()
  }

}
