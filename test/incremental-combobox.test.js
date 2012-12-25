describe('incremental-combobox', function() {
  var Combobox = require('incremental-combobox');

  chai.should();
  var shared = {};

  beforeEach(function() {
    this.ul = $('<ul/>');
    this.ul.$ = function(selector) { return $(selector, this); };
    this.combobox = new Combobox(this.ul);
  });

  describe('rendering', function() {
    shared.shouldBehaveLikeAddItem = function() {
      it('should append `Please select` element at first', function() {
        this.ul.$('option:first-child').should.have.text('Please select');
      });

      it('should append an option element', function() {
        this.ul.$('option').length.should.be.equal(this.items.length + 1);
      });

      it('should fill option\'s content by given `name`', function() {
        this.items.forEach(function(item) {
          this.ul.$('option').map(function() { return $(this).text(); }).get()
              .should.include(item.name);
        }.bind(this));
      });

      it('should fill option\'s value by given `value`', function() {
        this.items.forEach(function(item) {
          this.ul.$('option').map(function() { return $(this).val(); }).get()
              .should.include(item.value + '');
        }.bind(this));
      });
    };

    describe('add an item', function() {
      beforeEach(function() {
        this.items = [{ name: 'foo', value: 3 }];
        this.combobox.add(this.items[0]).render();
      });

      shared.shouldBehaveLikeAddItem();
    });

    describe('add items by array', function() {
      beforeEach(function() {
        this.items = [{ name: 'foo', value: 3 }, { name: 'bar', value: 4 }];
        this.combobox.add(this.items).render();
      });

      shared.shouldBehaveLikeAddItem();
    });

    describe('add items via successive call', function() {
      beforeEach(function() {
        this.items = [{ name: 'foo', value: 3 }, { name: 'bar', value: 4 }];
        this.combobox.add(this.items[0]).add(this.items[1]).render();
      });

      shared.shouldBehaveLikeAddItem();
    });
  });

  describe('plus button', function() {
    beforeEach(function() {
      this.items = [{ name: 'foo', value: 3 }, { name: 'bar', value: 4 }];
      this.combobox.add(this.items[0]).add(this.items[1]).render();
    });

    describe('when no item is selected', function() {
      it('should be deactivated', function() {
        this.ul.$('li:first-child .plus').should.have.attr('disabled', 'disabled');
      });
    });

    describe('when some item is selected', function() {
      it('should be activated', function() {
        this.ul.$('li:first-child option:nth-child(2)').attr('selected', true).change();
        this.ul.$('li:first-child .plus').should.not.have.attr('disabled', 'disabled');
      });
    });

    describe('clicked when it is activated', function() {
      it('should append new `select` who has options except for selected ones', function() {
        this.ul.$('li:first-child option:nth-child(2)').attr('selected', true).change();
        this.ul.$('.plus').click();
        this.ul.$('select').length.should.be.equal(2);
        this.ul.$('li:nth-child(2) option').each(function() {
          if (!/Please select/.test($(this).val())) { // except for `Please select`
            $(this).should.have.value('4');
          }
        });
      });
    });
  });

  describe('minus button', function() {
    beforeEach(function() {
      this.items = [{ name: 'foo', value: 3 }, { name: 'bar', value: 4 }];
      this.combobox.add(this.items[0]).add(this.items[1]).render();
      this.ul.$('li:first-child option:nth-child(2)').attr('selected', true).change();
      this.ul.$('.plus').click();
    });

    it('should remove `select`', function() {
      this.ul.$('.minus').first().click();
      this.ul.$('li').length.should.be.equal(1);
    });

    describe('after minus button is cliecked', function() {
      beforeEach(function() {
        this.ul.$('.minus').first().click();
      });

      it('the removed item should be selectable', function() {
        this.ul.$('li option').map(function() { return $(this).val(); }).get()
            .should.include(3, 4);
      });
    });
  });
});