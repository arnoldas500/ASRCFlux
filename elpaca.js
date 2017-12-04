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
			    this.getPropertyById['newSites2'].clear();
			}
		    }
		}
            },
            fields: {
		daterange: {
		    placeholder: 'Loading...',
		    type: 'daterange',
		    
		    picker: newDateRange
		},
		sitesNew2: {
                    type: "select",
		    multiple: true,
		    removeDefaultNone: true,
		    multiselect: {includeSelectAllOption: true},
		    dataSource: sitesNew2
		},
		variables: {
                    type: 'select',
		    dataSource: vars,
		    multiple: true,
		    multiselect: {includeSelectAllOption: true},
		    removeDefaultNone: true,
		    sort: false,
		    helper: "<a href=\"{% url 'datasets' %}\" target=\"_blank\">see data definitions</a>"
		},

		// sites: {
                //     type: "leaflet-select",
		//     removeDefaultNone: true,
		//     multiple: true,
		//     map_options: map_options,
		//     /* markerFunction: L.marker,*/
		//     marker: marker_options,
		//     selectedMarker: selected_marker_options,
		//     /* hideSelect: true*/
		// },
            }
	},
	view: {
	    parent: "bootstrap-edit-extra"
	},
    })
});
