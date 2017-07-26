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

    // Called after props or state(countdownStatus) gets updated for this component.
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

    // // Fires before props or state gets updated. Unlike componentDidUpdate instead of 
    // // taking in previous props and state it takes in new props and state.
    // componentWillUpdate: function(nextProps, nextState) { 

    // },

    // componentWillMount: function() { // Fires right before component is shown to screen
    //     console.log('componentWillMount');
    // },

    // componentDidMount: function() { // Fired right after everything is rendered in the DOM.
    //     console.log('componentDidMount');
    // },

    componentWillUnmount: function() { // executes when going from Countdown page to clicking Timer page
        //console.log('componentDidUnmount');
        clearInterval(this.timer);
        this.timer = undefined;
    },

    startTimer: function() {
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState({
                count: newCount >=0 ? newCount : 0
            });

        if (newCount === 0) { // Show the input form again once count is zero.
            this.setState({countdownStatus: 'stopped'});
        }
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
            
            if (countdownStatus !== 'stopped') {
                return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
            } else {
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