class WordCleaner {

  static clean(word) {
    return word
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g,'')
      .trim()
      .toLocaleLowerCase()
  }

}
