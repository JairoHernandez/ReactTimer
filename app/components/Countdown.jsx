var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
    getInitialState: function() {
        return {
            count: 0, 
            countdownStatus: 'stopped' // Maintains current status of timer.
        }
    },

    // Called after either props or state(countdownStatus) gets updated. 
    // Compares countdownStatus in handleSetCountdown vs. getInitialState.
    // Where prevState is 'stopped' from getInitialState.
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.countdownStatus !== prevState.countdownStatus) {
            switch(this.state.countdownStatus) {
                case 'started':
                    this.startTimer();
                    break;
            }
        }
    },

    startTimer: function() {
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState({
                count: newCount >=0 ? newCount : 0
            });
        }, 1000);
    },

    handleSetCountdown: function(seconds) {
        this.setState({
            count: seconds, // Assigned to from the form input.
            countdownStatus: 'started' 
        });
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