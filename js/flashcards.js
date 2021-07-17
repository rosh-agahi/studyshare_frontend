class Flashcard {
  constructor(flashcard, flashcardAttributes) {
    this.id = flashcard.id
    this.term = flashcardAttributes.term
    this.definition = flashcardAttributes.definition
    this.subject = flashcardAttributes.subject_id
    this.user = flashcardAttributes.user_id
    this.name = flashcardAttributes.name
    Flashcard.all.push(this)
    console.log(this);
  }
}

Flashcard.all = []
