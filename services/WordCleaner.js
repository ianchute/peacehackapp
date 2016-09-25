class WordCleaner {

  static clean(word) {
    return word
      .replace(/\'s/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@\"\'|]/g,'')
      .trim()
      .toLocaleLowerCase()
  }

}
