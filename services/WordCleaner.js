class WordCleaner {

  static clean(word) {
    return word
      // remove hyperlinks
      .replace(/https?:.*\s/g, '')

      // remove tags
      .replace(/@[A-Za-z]+\s/g, '')

      // remove hashtags
      .replace(/#[A-Za-z]+\s/g, '')

      // remove possessive case
      .replace(/\'s/g, '')

      // only letters
      .replace(/[^a-zA-Z_\s]/g, '')

      // trim ends
      .trim()

      // lowercase
      .toLocaleLowerCase()
  }

}
