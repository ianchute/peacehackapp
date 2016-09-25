class WordCleaner {

  static clean(word) {
    return word
      // remove tags
      .replace(/@[A-Za-z]+\s/g, '')

      // remove hashtags
      .replace(/#[A-Za-z]+\s/g, '')

      // remove possessive case
      .replace(/\'s/g, '')

      // only use alphanumeric
      .replace(/[^0-9a-zA-Z_\s]/g, '')

      // trim ends
      .trim()

      // lowercase
      .toLocaleLowerCase()
  }

}
