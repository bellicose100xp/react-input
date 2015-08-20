/**
 * Created by buggy on 8/19/15.
 */
$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homepage');
var About = require('./components/about/aboutpage');
var Header = require('./components/common/header');

(function(win){
    "use strict";

    var App = React.createClass({
        render: function () {
            var Child;

            switch(this.props.route) {
                case 'about': Child = About; break;
                default : Child = Home;
            }

            return (
                <div>
                    <Header />
                    <Child />
                </div>
            );
        }
    });

    var render = function () {
        React.render(<App route={win.location.hash.substr(1)} />, document.querySelector('#app'));
    };

    win.addEventListener('hashchange', render);

    render();

})(window);

