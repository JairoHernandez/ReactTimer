var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

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
                case 'stopped':
                    this.setState({count: 0});
                case 'paused':
                    clearInterval(this.timer); // leaves count wherever it was
                    this.timer = undefined;
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

    handleStatusChange: function(newStatus) {
        this.setState({countdownStatus: newStatus});
    },

    render: function() {

        var {count, countdownStatus} = this.state;
        var renderControlArea = () => {
            console.log(countdownStatus);
            if (countdownStatus !== 'stopped') {
                return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
            } else {
                console.log('test');
                return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            }
        };
        return (
            <div>       
                <Clock totalSeconds={count}/>
                {renderControlArea()}
            </div>
        );
    }
});

module.exports = Countdown;