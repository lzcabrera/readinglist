App = Ember.Application.create();

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

App.IndexController = Ember.Controller.extend({});

App.BooksController = Ember.ArrayController.extend({
  sortProperties: ['SKU']
});
App.GenresController = Ember.ArrayController.extend({
  sortProperties: ['name']
});
App.GenreController = Ember.Controller.extend({
});

// App.BookDetailsComponent = Ember.Component.extend({
//   classNameBindings: ['ratingClass'],
//   ratingClass: function() {
//     return "rating-" + this.get('book.rating');
//   }.property('book.rating')
// });

App.ApplicationAdapter = DS.FixtureAdapter.extend({
});


App.Book = DS.Model.extend({
  SKU: DS.attr(),
  price: DS.attr(),
  rating: DS.attr('number'),
  genre: DS.belongsTo('genre'),
  image_src: DS.attr(),
  url: function(){
    return "http://amazon.com/gp/product/"+this.get('image_src')+"/lzcabrera";
  }.property('image_src'),
  image: function(){
    return "images/"+this.get('image_src');
  }.property('image_src')
});

var i = 0;

App.Book.FIXTURES = [
  {
    id: i++,
    SKU: 'Delivering Happiness',
    price: 'Interesting read on how important it is to build and invest in fostering a company culture',
    genre: 1,
    image_src: '22775084_040_b.jpg'
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
