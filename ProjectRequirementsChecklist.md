Project Requirements

- [ ] Single Page Application (SPA).
- [ ] Your frontend will be built with HTML, CSS, and JavaScript.
- [x] Your frontend will communicate with a backend API that you'll build with Ruby and Rails. 

- [ ] The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend.
    - [x] Rails Structure
        - User (has many flashcards, has many subjects through flashcards)
          - attributes: username
        - Flashcard (belong to a user, belongs to a subject)
          - attributes: term, definition
        - Subject (has many flashcards)
          - attributes: name

- [ ] All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format.
- [ ] The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.
- [ ] The domain model served by the Rails backend must include a resource with at least one has-many relationship. For example, if you were building an Instagram clone, you might display a list of photos with associated comments.
- [ ] The backend and frontend must collaborate to demonstrate Client-Server Communication. Your application should have
    - [ ] at least 3 AJAX calls,
        - [ ] covering at least 2 of Create, Read, Update, and Delete (CRUD).
            - [ ] Create - create flashcards
            - [ ] Read - read flashcards
- [ ] Your client-side JavaScript code must use fetch with the appropriate HTTP verb, and your Rails API should use RESTful conventions. 
JavaScript
- [ ] Use classes and functions to organize your code into reusable pieces.
- [ ] Translate JSON responses into JavaScript model objects using ES6 class or constructor function syntax.
- [ ] Use ES6 features when appropriate (e.g. arrow functions, let & const, rest and spread syntax).

Rails
- [ ] Follow Rails MVC and RESTful conventions. That means, for example, that a request GET /puppies ought to be handled by the PuppiesController, fetch puppies from the database using a Puppy Active Record model, and return a list of puppies as JSON.
- [ ] Well-named variables and methods
- [ ] Short, single-purpose methods
