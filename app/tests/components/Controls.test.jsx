var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ =require('jquery');

var Controls = require('Controls');

describe('Controls', () => {
    it('should exist', () => {
        expect(Controls).toExist();
    });

    describe('render', () => {
        it('should render Pause when started', () => { 
            // Empty onStatusChange property is needed to avoid harmless ERROR/Warning
            // ERROR: 'Warning: Failed propType: Required prop `onStatusChange` was not specified in `Controls`.'
            var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started" onStatusChange={() => {}}/>);
            var $el = $(ReactDOM.findDOMNode(controls));
            var $pauseButton = $el.find('button:contains(Pause)');

            expect($pauseButton.length).toBe(1);
        });

        it('should render Start when paused', () => {
            // Same goes here to avoid harmless ERROR/Warning from above.
            var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused" onStatusChange={() => {}}/>);
            var $el = $(ReactDOM.findDOMNode(controls));
            var $startButton = $el.find('button:contains(Start)');

            expect($startButton.length).toBe(1);
        });
    });
});