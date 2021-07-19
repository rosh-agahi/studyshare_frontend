class Subject {
  constructor(subject, subjectAttributes) {
    this.id = subject.id
    this.name = subjectAttributes.name
    Subject.all.push(this)
    console.log(this);
  }

  // render() {
  //
  // }
}

Subject.all = []
