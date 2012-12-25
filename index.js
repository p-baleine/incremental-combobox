
/**
 * Module dependencies.
 */

var type = require('type')
  , o = require('jquery')
  , _ = require('underscore')
  , html = _.template(require('./template'));

/**
 * Expose `Combobox`
 */

exports = module.exports = Combobox;

function Combobox(el) {
  if (!(this instanceof Combobox)) { return new Combobox(el); }
  this.el = o(el);
  this.$ = function(selector) { return $(selector, this.el); };
  this.selects = [];
  this.items = [];
  this.notSelected = [];
  this.delegate();
}

Combobox.prototype.add = function(items) {
  if (type(items) !== 'array') { items = [items]; }
  this.notSelected = this.items = this.items.concat(items);
  return this;
};

Combobox.prototype.render = function() {
  var select = o(html({ items: this.notSelected }));
  this.selects.push(select);
  this.el.append(select);
  return this;
};

Combobox.prototype.delegate = function() {
  this.el.on('click', '.plus', _.bind(this.append, this));
  this.el.on('click', '.minus', _.bind(this.remove, this));
  this.el.on('change', 'select', _.bind(this.select, this));
};

Combobox.prototype.append = Combobox.prototype.render;

Combobox.prototype.remove = function(e) {
  e.preventDefault();
  $(e.target).parents('li').remove();
  this.notSelected.push($(e.target));
  this.updateOptions();
};

Combobox.prototype.updateOptions = function() {
  this.$('select').empty();
};

Combobox.prototype.select = function(e) {
  this.$('.plus').attr('disabled', false);
  this.reject(o(e.target).val());
};

Combobox.prototype.reject = function(val) {
  this.notSelected = _.reject(this.notSelected, function(item) { return item.value == val; });
};