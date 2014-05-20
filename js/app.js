App = Ember.Application.create();

// route
App.Router.map(function() {
  // put your routes here
  this.resource('book', {path: 'books/:book_id'});
  this.resource('genre', { path: '/genres/:genre_id'});
});
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      books: this.store.findAll('book'),
      genres: this.store.findAll('genre')
    });
  },
  setupController: function(controller, model){
    controller.set('books', model.books);
    controller.set('genres', model.genres);
  }
});
App.BookRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('book', params.book_id);
  }
});

// controller
App.IndexController = Ember.Controller.extend({});

App.BooksController = Ember.ArrayController.extend({
  sortProperties: ['title']
});
App.GenresController = Ember.ArrayController.extend({
  sortProperties: ['name']
});
App.GenreController = Ember.Controller.extend({
});

// component
App.BookDetailsComponent = Ember.Component.extend({
  classNameBindings: ['ratingClass'],
  ratingClass: function() {
    return "rating-" + this.get('book.rating');
  }.property('book.rating')
});

// data
App.ApplicationAdapter = DS.FixtureAdapter.extend({
});

App.Book = DS.Model.extend({
  title: DS.attr(),
  author: DS.attr(),
  review: DS.attr(),
  rating: DS.attr('number'),
  genre: DS.belongsTo('genre'),
  amazon_id: DS.attr(),
  url: function(){
    return "http://amazon.com/gp/product/"+this.get('amazon_id')+"/lzcabrera";
  }.property('amazon_id'),
  image: function(){
    return "http://images.amazon.com/images/P/"+this.get('amazon_id')+".01.ZTZZZZZZ.jpg";
  }.property('amazon_id')
});
App.Book.FIXTURES = [
  {
    id: 1,
    title: 'Delivering Happiness',
    author: 'Tony Hsieh',
    review: 'Interesting read on how important it is to build and invest in fostering a company culture',
    rating: 5,
    genre: 1,
    amazon_id: 'B003JTHXN6'
  },
  {
    id: 2,
    title: 'Without their Permission',
    author: 'Alexis Onihana',
    review: 'Great read on startups and enterprenuership',
    rating: 5,
    genre: 1,
    amazon_id: 'B00BAXFJ16'
  },
  {
    id: 3,
    title: 'The Kite Runner',
    author: '',
    review: 'I couldn\'t put the book down as soon as I started reading it.',
    rating: 4,
    genre: 2,
    amazon_id: 'B0031TZB3I'
  }
];

App.Genre = DS.Model.extend({
  name: DS.attr(),
  books: DS.hasMany('book')
});
App.Genre.FIXTURES = [
  {
    id: 1,
    name: 'Startups',
    books: [1,2]
  },
  {
    id: 2,
    name: 'Historical Fiction',
    books: [3]
  }
];
