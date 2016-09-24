class GooglePlusContainer {

  constructor(url, container) {

    this.id = Guid.create()

    const $elem = $(`<div
      id="${this.id}"
      class="g-post"
      data-href="${url}">
    </div>`)

    $(container).append($elem)
  }

  deleteComponent() {
    $(`#${this.id}`).remove()
  }

}
