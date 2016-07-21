if (window.require) {
    window.require.config({
        map: {
            "*" : {
                "react": "https://fb.me/react-15.2.1.min.js",
                "react-dom": "https://fb.me/react-dom-15.2.1.min.js"
            }
        }
    });
}

import ComponentDOM from "./react_area";

var handle_cell = function(cell) {
    if (cell.cell_type==='code') {
        var domEl = new ComponentDOM(cell);
        cell.react_dom = domEl;
    }
};

function register_events(Jupyter, events) {
    var cells = Jupyter.notebook.get_cells();
    cell.forEach( cell => {
        handle_cell( cell );
    });

    events.on( 'create.Cell', function( event, data ) {
        handle_cell( data.cell );
    });
    events.on( 'delete.Cell', function( event, data ) {
        if ( data.cell && data.cell.widgetarea ) {
            data.cell.widgetarea.dispose();
        }
    });
}

function load_ipython_extension () {
    return new Promise(function(resolve) {
        requirejs([
            "base/js/namespace",
            "base/js/events",
            'react', 
            'react-dom'
        ], function( Jupyter, events, React, ReactDom ) {
            window.React = React;
            window.ReactDom = ReactDom;
            register_events(Jupyter, events);
            resolve();
        });
    });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
