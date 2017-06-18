'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataHolder;
var placeTypes = {
	'neighborhood': {
		'type_label': 'Neighborhood',
		'address_components': [0, 3]
	},
	'locality': {
		'type_label': 'Town/City',
		'address_components': [0, 3]
	},
	'administrative_area_level_2': {
		'type_label': 'County',
		'address_components': [0, 1]
	},
	'political': {
		'type_label': 'Region',
		'address_components': [0, 1]
	},
	'administrative_area_level_1': {
		'type_label': 'State/Territory',
		'address_components': [0, 1]
	}
};
var states = {
	'AL': {
		'name': 'Alabama',
		'type': 'State'
	},
	'AK': {
		'name': 'Alaska',
		'type': 'State'
	},
	'AS': {
		'name': 'American Samoa',
		'type': 'Territory'
	},
	'AZ': {
		'name': 'Arizona',
		'type': 'State'
	},
	'AR': {
		'name': 'Arkansas',
		'type': 'State'
	},
	'CA': {
		'name': 'California',
		'type': 'State'
	},
	'CO': {
		'name': 'Colorado',
		'type': 'State'
	},
	'CT': {
		'name': 'Connecticut',
		'type': 'State'
	},
	'DE': {
		'name': 'Delaware',
		'type': 'State'
	},
	'DC': {
		'name': 'District Of Columbia',
		'type': 'District'
	},
	'FL': {
		'name': 'Florida',
		'type': 'State'
	},
	'GA': {
		'name': 'Georgia',
		'type': 'State'
	},
	'GU': {
		'name': 'Guam',
		'type': 'Territory'
	},
	'HI': {
		'name': 'Hawaii',
		'type': 'State'
	},
	'ID': {
		'name': 'Idaho',
		'type': 'State'
	},
	'IL': {
		'name': 'Illinois',
		'type': 'State'
	},
	'IN': {
		'name': 'Indiana',
		'type': 'State'
	},
	'IA': {
		'name': 'Iowa',
		'type': 'State'
	},
	'KS': {
		'name': 'Kansas',
		'type': 'State'
	},
	'KY': {
		'name': 'Kentucky',
		'type': 'State'
	},
	'LA': {
		'name': 'Louisiana',
		'type': 'State'
	},
	'ME': {
		'name': 'Maine',
		'type': 'State'
	},
	'MD': {
		'name': 'Maryland',
		'type': 'State'
	},
	'MA': {
		'name': 'Massachusetts',
		'type': 'State'
	},
	'MI': {
		'name': 'Michigan',
		'type': 'State'
	},
	'MN': {
		'name': 'Minnesota',
		'type': 'State'
	},
	'MS': {
		'name': 'Mississippi',
		'type': 'State'
	},
	'MO': {
		'name': 'Missouri',
		'type': 'State'
	},
	'MT': {
		'name': 'Montana',
		'type': 'State'
	},
	'NE': {
		'name': 'Nebraska',
		'type': 'State'
	},
	'NV': {
		'name': 'Nevada',
		'type': 'State'
	},
	'NH': {
		'name': 'New Hampshire',
		'type': 'State'
	},
	'NJ': {
		'name': 'New Jersey',
		'type': 'State'
	},
	'NM': {
		'name': 'New Mexico',
		'type': 'State'
	},
	'NY': {
		'name': 'New York',
		'type': 'State'
	},
	'NC': {
		'name': 'North Carolina',
		'type': 'State'
	},
	'ND': {
		'name': 'North Dakota',
		'type': 'State'
	},
	'MP': {
		'name': 'Northern Mariana Islands',
		'type': 'Commonwealth'
	},
	'OH': {
		'name': 'Ohio',
		'type': 'State'
	},
	'OK': {
		'name': 'Oklahoma',
		'type': 'State'
	},
	'OR': {
		'name': 'Oregon',
		'type': 'State'
	},
	'PA': {
		'name': 'Pennsylvania',
		'type': 'State'
	},
	'PR': {
		'name': 'Puerto Rico',
		'type': 'Commonwealth'
	},
	'RI': {
		'name': 'Rhode Island',
		'type': 'State'
	},
	'SC': {
		'name': 'South Carolina',
		'type': 'State'
	},
	'SD': {
		'name': 'South Dakota',
		'type': 'State'
	},
	'TN': {
		'name': 'Tennessee',
		'type': 'State'
	},
	'TX': {
		'name': 'Texas',
		'type': 'State'
	},
	'UT': {
		'name': 'Utah',
		'type': 'State'
	},
	'VT': {
		'name': 'Vermont',
		'type': 'State'
	},
	'VI': {
		'name': 'Virgin Islands',
		'type': 'Territory'
	},
	'VA': {
		'name': 'Virginia',
		'type': 'State'
	},
	'WA': {
		'name': 'Washington',
		'type': 'State'
	},
	'WV': {
		'name': 'West Virginia',
		'type': 'State'
	},
	'WI': {
		'name': 'Wisconsin',
		'type': 'State'
	},
	'WY': {
		'name': 'Wyoming',
		'type': 'State'
	}
};

var searchTweaks = [{
	'term': ', VA,',
	'tweak': ' -west+virginia'
}, {
	'term': 'Virginia,',
	'tweak': ' -west+virginia'
}];

var DataHolder = function () {
	function DataHolder() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var districts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var states = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		var searchTweaks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

		_classCallCheck(this, DataHolder);

		this.places = [];
		this.state = '';
		this.data = data;
		this.districts = districts;
		this.states = states;
		this.searchTweaks = searchTweaks;
		this.loaderRenderer = new LoaderRenderer();
		this.resultsRenderer = new ResultsRenderer();
	}

	_createClass(DataHolder, [{
		key: 'addPlaces',
		value: function addPlaces() {
			var result;
			var place;
			var id;
			var label;
			var component1;
			var component2;
			var searchTweak;
			var typeLabel;
			var state = '';

			for (var i = 0; i < this.data.results.length; i++) {
				result = this.data.results[i];
				if (placeTypes[result.types[0]]) {
					place = {};
					component1 = result.address_components[placeTypes[result.types[0]].address_components[0]].long_name;
					id = placeTypes[result.types[0]].type_label.replace(/ /g, '_').replace(/\//g, '_').toLowerCase();
					if (result.types[0] === 'political') {
						id = id + '_' + i;
					}

					if (result.types[0] === 'administrative_area_level_1' && result.address_components[0].short_name in this.states) {
						typeLabel = states[result.address_components[0].short_name]['type'];
					} else {
						typeLabel = placeTypes[result.types[0]].type_label;
					}

					this.state = result.address_components[placeTypes[result.types[0]].address_components[1]].long_name;

					if (result.types[0] === 'administrative_area_level_1' && result.address_components[0].short_name in states && states[result.address_components[0].short_name]['type'] === 'State') {
						component2 = '+state';
					} else {
						component2 = ',+' + result.address_components[placeTypes[result.types[0]].address_components[1]].short_name;
					}
					searchTweak = this.getSearchTweaks(result);
					place = {
						'id': id,
						'type_label': typeLabel,
						'label': component1,
						'search_string': '' + component1 + component2,
						'search_tweak': searchTweak
					};
					this.places.push(place);
				}
			}

			this.districts['senate'] && state !== '' ? this.addDistrictPlaces() : this.processPlaces();
		}
	}, {
		key: 'addDistrictPlaces',
		value: function addDistrictPlaces() {
			var type_label;
			var place;

			for (var value in this.districts) {
				type_label = value.name.replace(' ' + value.district_number, '').replace('District', 'Legislative District');
				place = {
					'id': value.name.replace(/ /g, '_').replace(/\//g, '_').toLowerCase(),
					'type_label': type_label,
					'label': value.district_number,
					'search_string': this.state + '+' + value.name
				};
				this.places.push(place);
			}

			this.processPlaces();
		}
	}, {
		key: 'getSearchTweaks',
		value: function getSearchTweaks() {
			var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var searchTweak;
			for (var i = 0; i < this.searchTweaks.length; i++) {
				searchTweak = this.searchTweaks[i];
				if (result.formatted_address.indexOf(searchTweak.term) > -1) {
					return searchTweak.tweak;
				}
			}
			return '';
		}
	}, {
		key: 'processPlaces',
		value: function processPlaces() {
			var place;
			var q;

			this.loaderRenderer.clear();
			this.resultsRenderer.renderHeader();
			for (var i = 0; i < this.places.length; i++) {
				place = this.places[i];
				q = encodeURIComponent('"' + place.search_string + '" democratic organization' + place.search_tweak);
				this.resultsRenderer.renderBoxes(place);
				this.getFacebookData(place, q, this.resultsRenderer.renderFacebookBox);
				this.resultsRenderer.renderGoogleBox(place, q);
			}
		}
	}, {
		key: 'getFacebookData',
		value: function getFacebookData() {
			var place = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
			var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

			FB.api('/search?q=' + q + '\n\t\t\t&type=page\n\t\t\t&fields=id,name,about,contact_address,description,engagement,general_info,link,phone,single_line_address,website\n\t\t\t&access_token=301393976977338|o7BuFDcKxXWAL3i9b3T_2jJgfT4', function (response) {
				callback(place, response);
			});
		}
	}]);

	return DataHolder;
}();

var LoaderRenderer = function () {
	function LoaderRenderer() {
		_classCallCheck(this, LoaderRenderer);
	}

	_createClass(LoaderRenderer, [{
		key: 'clear',
		value: function clear() {
			$('.loader').empty();
		}
	}, {
		key: 'renderLocationLoader',
		value: function renderLocationLoader() {
			this.clear();
			$('.loader').append($('<img>', {
				src: '../images/loading_location.gif',
				alt: 'Loading Location',
				title: 'Loading Location'
			}));
		}
	}, {
		key: 'renderDataLoader',
		value: function renderDataLoader() {
			this.clear();
			$('.loader').append($('<img>', {
				src: '../images/loading_data.gif',
				alt: 'Loading Data',
				title: 'Loading Data'
			}));
		}
	}]);

	return LoaderRenderer;
}();

var ResultsRenderer = function () {
	function ResultsRenderer() {
		_classCallCheck(this, ResultsRenderer);
	}

	_createClass(ResultsRenderer, [{
		key: 'clear',
		value: function clear() {
			$('.results').empty();
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader() {
			$('.results').append('<h3>We Found Some Democratic Organizations:</h3>');
		}
	}, {
		key: 'renderBoxes',
		value: function renderBoxes(place) {
			$('.results').append('<h4>In Your ' + place.type_label + ' (' + place.label + ')</h4>');
			$('.results').append('<table id="' + place.id + '_results_table"></table>');
			$('#' + place.id + '_results_table').append('<tr id="' + place.id + '_results_row"></tr>');
		}
	}, {
		key: 'renderFacebookBox',
		value: function renderFacebookBox() {
			var place = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var blurb;
			var engagement;
			var contact;

			$('#' + place.id + '_results_row').append('<td id="' + place.id + '_facebook_results"></td>');
			$('#' + place.id + '_facebook_results').append('<ul id="' + place.id + '_facebook_results_list"></ul>');
			if (response && !response.error && response.data.length) {
				for (var i = 0; i < response.data.length; i++) {
					blurb = '';
					if (response.data[i].about) {
						blurb = '<p>' + response.data[i].about + '</p>';
					} else if (response.data[i].description) {
						blurb = '<p>' + response.data[i].description + '</p>';
					} else if (response.data[i].general_info) {
						blurb = '<p>' + response.data[i].general_info + '</p>';
					}
					engagement = '';
					if (response.data[i].engagement) {
						if (response.data[i].engagement.social_sentence === 'Be the first of your friends to like this.') {
							engagement = '<p>No one likes this Facebook page yet.</p>';
						} else {
							engagement = '<p>' + response.data[i].engagement.social_sentence.slice('.', -1) + ' Facebook page.</p>';
						}
					}
					contact = '';
					if (response.data[i].contact_address || response.data[i].phone || response.data[i].single_line_address || response.data[i].website) {
						contact = '<p>';
						if (response.data[i].phone) {
							contact = contact + '<span><a href="tel:' + response.data[i].phone + '">' + response.data[i].phone + '</span>';
						}
						if (response.data[i].website) {
							contact = contact + '<span><a href="' + response.data[i].website + '" title="Website">Website</a></span>';
						}
						if (response.data[i].contact_address) {
							contact = contact + '</p><p translate="no">' + response.data[i].contact_address;
						}
						if (response.data[i].single_line_address) {
							contact = contact + '</p><p translate="no">' + response.data[i].single_line_address;
						}
						contact = contact + '</p>';
					}
					$('#' + place.id + '_facebook_results_list').append('<li>\n\t\t\t\t\t<a href="' + response.data[i].link + '" title="' + response.data[i].name + '" target="_blank">' + response.data[i].name + '</a><br>\n\t\t\t\t\t' + blurb + '\n\t\t\t\t\t' + engagement + '\n\t\t\t\t\t' + contact + '\n\t\t\t\t\t</li>');
				}
			} else {
				$('#' + place.id + '_facebook_results_list').append('<p class="empty">We got nothing from Facebook. Maybe you can start something?</p>');
			}
		}
	}, {
		key: 'renderGoogleBox',
		value: function renderGoogleBox() {
			var place = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

			$('#' + place.id + '_results_row').append('<td id="' + place.id + '_google_results"></td>');
			$('<iframe>', {
				src: '../search.html?q=' + q,
				id: place.id + '_google_results_iframe',
				frameborder: 0,
				scrolling: 'yes'
			}).appendTo('#' + place.id + '_google_results');
		}
	}]);

	return ResultsRenderer;
}();

$(document).ready(function () {
	loaderRenderer = new LoaderRenderer();
	initFacebook();
	getLocation();
});

function initFacebook() {
	$.ajaxSetup({ cache: true });
	$.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
		FB.init({
			appId: '301393976977338',
			version: 'v2.7'
		});
		$('#loginbutton,#feedbutton').removeAttr('disabled');
		//FB.getLoginStatus(updateStatusCallback);
	});
}

function getLocation() {
	if (navigator.geolocation) {
		loaderRenderer.renderLocationLoader();
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		showError({
			code: 'legacy'
		});
		loadForm();
	}
}

function loadForm() {
	$('.search').append($('<h3/>').text('Contact Form'), $('<p/>').text('This is my form. Please fill it out. It\'s awesome!'), $('<form/>', {
		id: 'location',
		name: 'location'
	}).append($('<input/>', {
		type: 'text',
		id: 'address1',
		name: 'address1',
		placeholder: 'Street Address, Line 1',
		required: true
	}), $('<input/>', {
		type: 'text',
		id: 'address2',
		name: 'address2',
		placeholder: 'Street Address, Line 2'
	}), $('<input/>', {
		type: 'text',
		id: 'city',
		name: 'city',
		placeholder: 'City/Town',
		required: true
	}), $('<select/>', {
		id: 'state',
		name: 'state',
		placeholder: 'State',
		required: true
	}), $('<br/>'), $('<input/>', {
		type: 'submit',
		id: 'submit',
		value: 'Submit'
	})));
	$('#state').append($('<option>', {
		value: '',
		text: 'Select a state/territory',
		selected: true
	}));
	$.each(states, function (key, value) {
		$('#state').append($('<option>', {
			value: this.key,
			text: this.value.name
		}));
	});
	$('#state').change(function () {}).trigger('change');
	$('#location').on('submit', function (e) {
		e.preventDefault();
		clearResults();
		processForm($(this));
	});
}

function processForm() {
	var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var position;
	var address = form.children('input[name="address1"]').val();
	var address2 = form.children('input[name="address2"]').val();
	if (address2 !== '') {
		address = address + ',+' + address2;
	}
	address = address + ',+' + form.children('input[name="city"]').val();
	address = address + ',+' + form.children('#state').val();
	address = address.replace(/ /g, '_').replace(/\//g, '_').toLowerCase();
	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBO4ShgmmgpAeZfCcu8YYTZZ04i0vxR4DA'
	}).then(function (data) {
		if (data.status === 'ZERO_RESULTS') {
			showError('noformresults');
			return;
		}
		position = {
			coords: {
				latitude: data.results[0].geometry.location.lat,
				longitude: data.results[0].geometry.location.lng
			}
		};
		showPosition(position);
	});
};

function showPosition() {
	var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var districts = [];

	loaderRenderer.renderDataLoader();
	$.ajax({
		url: 'https://api.geocod.io/v1/reverse?q=' + position.coords.latitude + ',' + position.coords.longitude + '&fields=stateleg&api_key=cc8e7cb67fc566e98de4fd9b56dbb922788f52f'
	}).then(function (data) {
		if (data.results[0].fields.state_legislative_districts) {
			districts = data.results[0].fields.state_legislative_districts;
		}
		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyBO4ShgmmgpAeZfCcu8YYTZZ04i0vxR4DA'
		}).then(function (data) {
			dataHolder = new DataHolder(data, districts, states, searchTweaks);
			dataHolder.addPlaces();
		});
	});
}

function showError() {
	var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	switch (error.code) {
		case error.PERMISSION_DENIED:
			console.log('User denied the request for Geolocation.');
			break;
		case error.POSITION_UNAVAILABLE:
			console.log('Location information is unavailable.');
			break;
		case error.TIMEOUT:
			console.log('The request to get user location timed out.');
			break;
		case error.UNKNOWN_ERROR:
			console.log('An unknown error occurred.');
			break;
		case 'legacy':
			console.log('Geolocation is not supported by this browser.');
			break;
		case 'noformresults':
			console.log('Geolocation is not supported by this browser.');
			break;
		default:
			console.log('Yo dawg I heard you like errors, so I put errors in your errors so you can error while you error.');
			break;
	}
}
//# sourceMappingURL=howdoipoliticsmain-compiled.js.map
