var React = require('react');
var Navigation = require('Navigation');

// var Main = React.createClass({
//     render: function() {
//         return (
//             <div>
//                 <Nav/>
//                 <h1>Main Component</h1>
//                 {this.props.children}
//             </div>
//         );
//     }
// });

var Main = (props) => {
    //debugger;
    return (
        <div>
            <Navigation/>
            <div className="row">
                <div className="column small-centered medium-6 large-4">
                    {props.children}
                </div>
            </div>            
        </div>
    );
};

// If you forget this you will get 'Error: The root route must render a single element'
module.exports = Main; 