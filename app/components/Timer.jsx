var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');


var Timer = React.createClass({

    getInitialState: function() {
        return {
            count: 0,
            timerStatus: 'stopped'
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.timerStatus !== prevState.timerStatus) {
            switch (this.state.timerStatus) {
                case 'started':
                    // console.log('started');
                    this.handleStart();
                    break;
                case 'stopped':
                    // console.log('stopped');
                    this.setState({count: 0});
                case 'paused':
                    // console.log('paused');
                    clearInterval(this.timer); // stops the timer
                    this.timer = undefined;
                    break;
            }
        }
    },

    // otherwise you will get 
    // Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the Timer component.
    componentWillUnmount: function() {
        clearInterval(this.timer);
    },

    handleStart: function() {
        this.timer = setInterval(() => {
            this.setState({
                count: this.state.count + 1
            });

        }, 1000);
    },

    handleStatusChange: function(newTimerStatus) {  // changes timer status
        //console.log('newTimerStatus:', newTimerStatus);
        this.setState({timerStatus: newTimerStatus});
    },

    render: function() {
        var {count, timerStatus} = this.state;

        return (
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={count}/>
                <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
            </div>
        );
    }
});

module.exports = Timer;