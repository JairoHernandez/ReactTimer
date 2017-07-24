var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
    getInitialState: function() {
        return {count: 0};
    },

    handleSetCountdown: function(seconds) {
        this.setState({
            count: seconds // Assigned to from the form input.
        })
    },

    render: function() {

        var {count} = this.state;
        return (
            <div>       
                <Clock totalSeconds={count}/>
                <CountdownForm onSetCountdown={this.handleSetCountdown}/>
                <p>Countdown.jsx</p>
            </div>
        );
    }
});

module.exports = Countdown;