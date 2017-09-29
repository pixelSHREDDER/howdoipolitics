'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataHandler;
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
	'administrative_area_level_1': {
		'type_label': 'State/Territory',
		'address_components': [0, 1]
	},
	'country': {
		'type_label': 'Country',
		'address_components': [0]
	},
	'political': {
		'type_label': 'Region',
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

var DataHandler = function () {
	function DataHandler() {
		var placeTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var states = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var searchTweaks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		_classCallCheck(this, DataHandler);

		this.places = [];
		this.state = '';
		this.data = [];
		this.districts = {};
		this.placeTypes = placeTypes;
		this.states = states;
		this.searchTweaks = searchTweaks;
		this.errorHandler = new ErrorHandler();
		this.formRenderer = new FormRenderer();
		this.loaderRenderer = new LoaderRenderer();
		this.resultsRenderer = new ResultsRenderer();
	}

	_createClass(DataHandler, [{
		key: 'initFacebook',
		value: function initFacebook() {
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
	}, {
		key: 'getLocation',
		value: function getLocation() {
			var self = this;

			self.loaderRenderer.renderLocationLoader();
			/*if (navigator.geolocation) {
   	navigator.geolocation.getCurrentPosition(function(position) {
   		self.formRenderer.renderForm({
   			parent: self,
   			position: position
   		});
   		self.loaderRenderer.clear();
   	}, function(error) {
   		self.loaderRenderer.clear();
   		self.errorHandler.showError(error);
   	});
   } else {*/
			self.loaderRenderer.clear();
			self.errorHandler.showError({
				code: 'legacy'
			});
			self.formRenderer.renderForm({
				parent: self,
				states: self.states
			});
			//}
		}
	}, {
		key: 'processForm',
		value: function processForm() {
			var $form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (!position) {
				this.processFallbackForm($form);
			} else {
				this.showPosition(position);
			}
		}
	}, {
		key: 'processFallbackForm',
		value: function processFallbackForm() {
			var $form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var self = this;
			var position;
			var address = $form.find('input[name="address1"]').val();
			var address2 = $form.find('input[name="address2"]').val();

			if (address2 !== '') {
				address = address + ',+' + address2;
			}
			address = address + ',+' + $form.find('input[name="city"]').val();
			address = address + ',+' + $form.find('#state').val();
			address = address.replace(/ /g, '_').replace(/\//g, '_').toLowerCase();

			$.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBO4ShgmmgpAeZfCcu8YYTZZ04i0vxR4DA'
			}).then(function (data) {
				if (data.status === 'ZERO_RESULTS') {
					self.errorHandler.showError('noformresults');
					return;
				}
				position = {
					coords: {
						latitude: data.results[0].geometry.location.lat,
						longitude: data.results[0].geometry.location.lng
					}
				};
				self.showPosition(position);
			});
		}
	}, {
		key: 'showPosition',
		value: function showPosition() {
			var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var self = this;

			self.loaderRenderer.renderDataLoader();
			$.ajax({
				url: 'https://api.geocod.io/v1/reverse?q=' + position.coords.latitude + ',' + position.coords.longitude + '&fields=stateleg&api_key=cc8e7cb67fc566e98de4fd9b56dbb922788f52f'
			}).then(function (data) {
				if (data.results[0].fields.state_legislative_districts) {
					self.districts = data.results[0].fields.state_legislative_districts;
				}
				$.ajax({
					url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyBO4ShgmmgpAeZfCcu8YYTZZ04i0vxR4DA'
				}).then(function (data) {
					self.data = data;
					self.addPlaces();
				});
			});
		}
	}, {
		key: 'getPlaceType',
		value: function getPlaceType() {
			var placeTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var type;
			var types = result.types.reduce(function (acc, cur, i) {
				acc[cur] = cur;
				return acc;
			}, {});

			for (var placeType in placeTypes) {
				if (types[placeType]) {
					if (placeType === 'region' && result.address_components.length === 1) {
						type = placeTypes['country'];
						type.key = 'country';
					} else {
						type = placeTypes[placeType];
						type.key = placeType;
					}
					break;
				};
			}

			return type;
		}
	}, {
		key: 'addPlaces',
		value: function addPlaces() {
			var result;
			var place;
			var id;
			var label;
			var component1;
			var component2;
			var searchTweak;
			var type;
			var typeLabel;

			for (var i = 0; i < this.data.results.length; i++) {
				result = this.data.results[i];
				type = this.getPlaceType(this.placeTypes, result);

				if (type) {
					place = {};
					component1 = result.address_components[type.address_components[0]].long_name;
					component2 = '';
					id = type.type_label.replace(/ /g, '_').replace(/\//g, '_').toLowerCase();

					if (type.key === 'political') {
						id = id + '_' + i;
					}

					if (type.key === 'administrative_area_level_1' && result.address_components[0].short_name in this.states) {
						typeLabel = states[result.address_components[0].short_name]['type'];
					} else {
						typeLabel = type.type_label;
					}

					//this.state = result.address_components[type.address_components[1]].long_name;

					if (type.key === 'administrative_area_level_1' && result.address_components[0].short_name in this.states && states[result.address_components[0].short_name]['type'] === 'State') {
						component2 = '+state';
						this.state = result.address_components[type.address_components[0]].long_name;
					} else if (type.address_components.length > 1) {
						component2 = ', ' + result.address_components[type.address_components[1]].short_name;
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

			this.districts['senate'] && this.state !== '' ? this.addDistrictPlaces() : this.processPlaces();
		}
	}, {
		key: 'addDistrictPlaces',
		value: function addDistrictPlaces() {
			var district;
			var type_label;
			var place;

			for (var key in this.districts) {
				district = this.districts[key];
				type_label = district.name.replace(' ' + district.district_number, '').replace('District', 'Legislative District');
				place = {
					'id': district.name.replace(/ /g, '_').replace(/\//g, '_').toLowerCase(),
					'type_label': type_label,
					'label': district.district_number,
					'search_string': this.state + ' ' + district.name
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
			var gQuery = '';
			var or = encodeURIComponent(' OR ');

			this.loaderRenderer.clear();
			this.resultsRenderer.renderResultsContainer();
			for (var i = 0; i < this.places.length; i++) {
				place = this.places[i];
				q = encodeURIComponent('"' + place.search_string + '" democratic organization' + place.search_tweak);
				gQuery = gQuery + encodeURIComponent('"' + place.search_string + '"');

				if (i < this.places.length - 1) {
					gQuery = '' + gQuery + or;
				}

				this.getFacebookData(q, this.resultsRenderer.renderFacebookBox);
			}
			gQuery = '%28' + gQuery + '%29%20democratic%20organization';
			console.log(gQuery);
			this.resultsRenderer.renderGoogleBox(gQuery);
		}
	}, {
		key: 'getFacebookData',
		value: function getFacebookData() {
			var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			FB.api('/search?q=' + q + '&type=page&fields=id,name,about,contact_address,description,engagement,general_info,link,phone,single_line_address,website&access_token=301393976977338|o7BuFDcKxXWAL3i9b3T_2jJgfT4', function (response) {
				callback(response);
			});
		}
	}, {
		key: 'init',
		value: function init() {
			this.initFacebook();
			this.getLocation();
		}
	}]);

	return DataHandler;
}();

var ErrorHandler = function () {
	function ErrorHandler() {
		_classCallCheck(this, ErrorHandler);
	}

	_createClass(ErrorHandler, [{
		key: 'clear',
		value: function clear() {}
	}, {
		key: 'showError',
		value: function showError() {
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
	}]);

	return ErrorHandler;
}();

var FormRenderer = function () {
	function FormRenderer() {
		_classCallCheck(this, FormRenderer);
	}

	_createClass(FormRenderer, [{
		key: 'clear',
		value: function clear() {}
	}, {
		key: 'renderForm',
		value: function renderForm(_ref) {
			var _ref$parent = _ref.parent,
			    parent = _ref$parent === undefined ? {} : _ref$parent,
			    _ref$position = _ref.position,
			    position = _ref$position === undefined ? null : _ref$position,
			    _ref$states = _ref.states,
			    states = _ref$states === undefined ? {} : _ref$states;

			$('.search').append($('<h3/>').text('What We Need To Know'), $('<p/>').text('Please fill out these fields to help us get a better sense of what you\'re looking for.'), $('<form/>', {
				id: 'search',
				name: 'search'
			}).append($('<fieldset/>').append($('<input/>', {
				type: 'radio',
				id: 'party',
				name: 'party',
				value: 'democratic',
				required: true
			}), $('<label/>', {
				text: 'Democrat'
			}), $('<input/>', {
				type: 'radio',
				id: 'party',
				name: 'party',
				value: 'republican',
				required: true
			}), $('<label/>', {
				text: 'Republican'
			})), $('<input/>', {
				type: 'submit',
				id: 'submit',
				value: 'Submit'
			})));

			if (!position) {
				this.renderFallbackFields(states);
			};

			$('#search').on('submit', { parent: parent, position: position }, function (e) {
				e.preventDefault();
				e.data.parent.processForm($(this), e.data.position);
			});
		}
	}, {
		key: 'renderFallbackFields',
		value: function renderFallbackFields(states) {
			$('<p/>', {
				text: 'We couldn\'t get your location automatically. Can you please tell us where you are? (We don\'t keep any personal info)'
			}).insertBefore('#submit');

			$('<fieldset/>').append($('<input/>', {
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
			})).insertBefore('#submit');

			$('#state').append($('<option>', {
				value: '',
				text: 'Select a state/territory',
				selected: true
			}));
			$.each(states, function (key, value) {
				$('#state').append($('<option>', {
					value: key,
					text: value.name
				}));
			});
			$('#state').change(function () {}).trigger('change');
		}
	}]);

	return FormRenderer;
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
		key: 'renderResultsContainer',
		value: function renderResultsContainer() {
			$('.results').append('<h3>We Found Some Democratic Organizations:</h3>');
			$('.results').append('<table id="results_table"></table>');
			$('#results_table').append('<tr id="results_row"></tr>');
			$('#results_row').append('<td id="facebook_results"></td>');
			$('#facebook_results').append('<ul id="facebook_results_list"></ul>');
		}
	}, {
		key: 'renderFacebookBox',
		value: function renderFacebookBox() {
			var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var blurb;
			var engagement;
			var contact;

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
							contact = contact + '<span><a href="' + response.data[i].website + '" title="Website" target="_blank">Website</a></span>';
						}
						if (response.data[i].contact_address) {
							contact = contact + '</p><p translate="no">' + response.data[i].contact_address;
						}
						if (response.data[i].single_line_address) {
							contact = contact + '</p><p translate="no">' + response.data[i].single_line_address;
						}
						contact = contact + '</p>';
					}
					$('#facebook_results_list').append('<li>\n\t\t\t\t\t<a href="' + response.data[i].link + '" title="' + response.data[i].name + '" target="_blank">' + response.data[i].name + '</a><br>\n\t\t\t\t\t' + blurb + '\n\t\t\t\t\t' + engagement + '\n\t\t\t\t\t' + contact + '\n\t\t\t\t\t</li>');
				}
			}
		}
	}, {
		key: 'renderGoogleBox',
		value: function renderGoogleBox() {
			var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			$('#results_row').append('<td id="google_results"></td>');
			$('<iframe>', {
				src: '../search.html?q=' + q,
				id: 'google_results_iframe',
				frameborder: 0,
				scrolling: 'yes'
			}).appendTo('#google_results');
		}
	}]);

	return ResultsRenderer;
}();

$(document).ready(function () {
	dataHandler = new DataHandler(placeTypes = placeTypes, states = states, searchTweaks = searchTweaks);
	dataHandler.init();
});
//# sourceMappingURL=howdoipoliticsmain-compiled.js.map
