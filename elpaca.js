/* setting up some alpaca options */
// var drpicker_options = {
//     timePicker: true,
//     timePicker24Hour: true,
//     timePickerIncrement: 5,
//     showDropdowns: true,
//     locale: {
// 	format: 'MM/DD/YYYY HH:mm'
//     },
//     opens: 'left'
// };
var newDateRange = {
    locale: {
	format: 'MM/DD/YYYY'
    }
};
var vars = {
    FC_mass: 'FC_mass',
    LE: 'LE',
    H: 'H',
    Rn: 'Rn',
    TAU: 'TAU',
    Bowen_ratio: 'Bowen_ratio',
    USTAR: 'USTAR',
    TKE: 'TKE',
    ZL: 'ZL',
    MO_LENGTH: 'MO_LENGTH',
    U: 'U',
    V: 'V',
    W: 'W',
    T_SONIC: 'T_SONIC',
    CO2: 'CO2',
    H2O: 'H2O',
    SW_IN: 'SW_IN',
    SW_OUT: 'SW_OUT',
    LW_IN: 'LW_IN',
    LW_OUT: 'LW_OUT',
    G_PLATE_1_1_1: 'G_PLATE_1_1_1',
    G_PLATE_2_1_1: 'G_PLATE_2_1_1',
    G_PLATE_3_1_1: 'G_PLATE_3_1_1',
    G_PLATE_4_1_1: 'G_PLATE_4_1_1'
};

var loc = {
    BELL:[ 43.78962,-76.11373 ],
    BKLN:[ 40.631762,-73.953678 ],
    BURT:[ 43.31699,-78.74903 ],
    CHAZ:[ 44.89565,-73.46461 ],
    FRED:[ 42.41817,-79.3666 ],
    ONTA:[ 43.25941,-77.37331 ],
    OWEG:[ 42.02571,-76.25543 ],
    PENN:[ 42.65578,-76.98746 ],
    QUEE:[ 40.734335,-73.815856 ],
    REDF:[ 43.62218,-75.87769 ],
    REDH:[ 42.00168,-73.88391 ],
    SCHU:[ 43.116996,-73.578284 ],
    SOUT:[ 41.040081,-72.465864 ],
    STAT:[ 40.604014,-74.148499 ],
    VOOR:[ 42.65242,-73.97562 ],
    WARS:[ 42.77993,-78.20889 ],
    WHIT:[ 43.485073,-73.423071 ]
    
}

var sitesNew2 = {

	BELL:'BELL',
	BKLN:'BKLN',
        BURT:'BURT',
	CHAZ:'CHAZ',
	FRED:'FRED',
	ONTA:'ONTA',
	OWEG:'OWEG',
	PENN:'PENN',
	QUEE:'QUEE',
	REDF:'REDF',
	REDH:'REDH',
        SCHU:'SCHU',
        SOUT:'SOUT',
	STAT:'STAT',
	VOOR:'VOOR',
	WARS:'WARS',
	WHIT:'WHIT'
    
}
var map_options = {zoomControl: false,
		   maxZoom: 16};
var marker_options = {radius: 6, color: 'blue', weight: 0,
		      opacity: .8, fillOpacity: .8};
var selected_marker_options = {color: 'orange'};
/* creating the form */
$(document).ready(function() {
    $("#form").alpaca({
	schema: {
            title: "Data Options",
            type: "object",
            properties: {
		daterange: {
		    title: 'Time range (UTC)',
		    type: 'string'
		},
		sitesNew2: {
                    type: 'string',
                    title: 'Sites'
		},
		variables: {
                    type: 'string',
                    title: 'Parameters',
		    default: 'CO2'
		},
		// sites: {
                //     type: 'string',
                //     title: 'Sites'
		// },
            }
	},
	options: {
	    focus: false,
	    form: {
		attributes: {
                    action: 'javascript:sendDate();'
		},
		buttons:{
                    submit: {
			title: 'View Data'
		    },
		    reset: {
			click: function(){
			    //console.log(this)
			    var form = $('#form').alpaca('get');
			   
			    var sitesNew3 = form.childrenByPropertyId['sitesNew2'];
			    sitesNew3.setValue([]);
			    sitesNew3.getControlEl().multiselect('refresh');

			    var vars = form.childrenByPropertyId['variables'];
			    vars.setValue([]);
			    vars.control.multiselect('refresh');
			    
			}
		    }
		}
            },
            fields: {
		daterange: {
		    placeholder: 'Please select a date range',
		    type: 'daterange',
		    
		    picker: newDateRange
		},
		sitesNew2: {
                    type: "leaflet-select",
		    multiple: true,
		    removeDefaultNone: true,
		    multiselect: {includeSelectAllOption: true},
		    dataSource: sitesNew2,
		    locations: loc,
		    marker: marker_options,
		    selectedMarker: selected_marker_options,
		},
		variables: {
                    type: 'select',
		    dataSource: vars,
		    multiple: true,
		    multiselect: {includeSelectAllOption: true},
		    removeDefaultNone: true,
		    sort: false,
		    helper: "<a href=\"http://appsvr.asrc.cestm.albany.edu/~xcite/fluxV3/helper.html\" target=\"_blank\">see data definitions</a>"
		},

		// sitesNew2: {
                //     type: "leaflet-select",
		//     removeDefaultNone: true,
		//     multiple: true,
		//     map_options: map_options,
		//     /* markerFunction: L.marker,*/
		//     marker: marker_options,
		//     selectedMarker: selected_marker_options,
		//     /* hideSelect: true*/
		// }
            }
	},
	view: {
	    parent: "bootstrap-edit-extra"
	},
    })
});
