import Ember from 'ember';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatTime from '../../formatters/format-time';
import formatTimeHelper from '../../helpers/format-time';

var view;
var dateStr   = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)';
var timeStamp = 1390518044403;

moduleForIntl('format-time', {
    setup: function (container) {
        container.register('formatter:format-time', FormatTime);
        Ember.HTMLBars._registerHelper('format-time', formatTimeHelper);
    },
    teardown: function () {
        runDestroy(view);
    }
});

test('exists', function() {
    expect(1);
    ok(formatTimeHelper);
});

test('invoke formatTime directly', function() {
    expect(1);
    equal(this.service.formatTime(timeStamp, { timeZone: 'UTC' }), '1/23/2014');
});

test('should throw if called with out a value', function(assert) {
    expect(1);
    view = this.intlBlock('{{format-time}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-time');
});

test('it should return a formatted string from a date string', function() {
    expect(1);

    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.intlBlock('{{format-time "' + dateStr + '" timeZone="UTC"}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function() {
    expect(1);

    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.intlBlock('{{format-time ' + timeStamp + ' timeZone="UTC"}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the time', function() {
    expect(1);

    view = this.intlBlock('{{format-time ' + timeStamp + ' hour="numeric" minute="numeric" timeZone="UTC"}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function() {
    expect(1);

    view = this.intlBlock('{{format-time 0}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), new Intl.DateTimeFormat('en').format(0));
});
