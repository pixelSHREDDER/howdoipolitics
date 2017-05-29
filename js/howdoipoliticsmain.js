var places = [];
var placeTypes = {
	'neighborhood': {
		'type_label': "Neighborhood",
		'address_components': [0, 3]
	},
	'locality': {
		'type_label': "Town/City",
		'address_components': [0, 2]
	},
	'administrative_area_level_2': {
		'type_label': "County",
		'address_components': [0, 1]
	},
	'political': {
		'type_label': "Region",
		'address_components': [0, 1]
	},
	'administrative_area_level_1': {
		'type_label': "State/Territory",
		'address_components': [0, 1]
	}
}
var oReq = new XMLHttpRequest();

function reqListener() {
	console.log(this.responseText);
}

oReq.onload = function() {
	alert(this.responseText);
};

oReq.open("get", "get-data.php", true);
oReq.send();

function parseResults(results) {
	var result;
	var place;
	var id;
	var label;
	var component1;
	var component2;
	for (var i = 0; i < results.length; i++) {
		result = results[i];
		//console.log(result);
		if (placeTypes[result.types[0]]) {
			place = {};
			component1 = result.address_components[placeTypes[result.types[0]].address_components[0]].long_name;
			id = placeTypes[result.types[0]].type_label.replace(/ /g, "_").replace(/\//g, "_").toLowerCase();
			if (result.types[0] === 'political') {
				id = id + '_' + i;
			}
			if ((result.types[0] === 'administrative_area_level_1') && (result.address_components[placeTypes[result.types[0]].address_components[1]].short_name != result.address_components[placeTypes[result.types[0]].address_components[1]].long_name)) {
				component2 = '+state';
			} else {
				component2 = ',+' + result.address_components[placeTypes[result.types[0]].address_components[1]].short_name;
			}
			place = {
				'id': id,
				'type_label': placeTypes[result.types[0]].type_label,
				'label': component1,
				'search_string': component1 + component2
			};
			places.push(place);
		}
	}
	addDistrictPlaces(places);
	//console.log(places);
}
function addDistrictPlaces(places) {
	/*$.ajax({
		url: 'https://congress.api.sunlightfoundation.com/districts/locate?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude + '&apikey='
	}).then(function(data) {
		place = {
			'id': 'state_congressional_district',
			'type_label': 'State Congressional District (CD)',
			'label': component1,
			'search_string': data.state + data.district + "+District"
		};
		places.push(place);*/
		loadResultsBoxes(places);
	//});
}
function loadResultsBoxes(places) {
	var place;
	var q;
	$('.results').append('<h3>We Found Some Democratic Organizations:</h3>');
	for (var i = 0; i < places.length; i++) {
		place = places[i];
		q = encodeURIComponent('"' + place.search_string + '" democratic organization');
		$('.results').append('<h4>In Your ' + place.type_label + ' (' + place.label + ')</h4>');
		$('.results').append('<table id="' + place.id + '_results_table"></table>');
		$('#' + place.id + '_results_table').append('<tr id="' + place.id + '_results_row' + '"></tr>');
		loadFacebookResultsBox(place, q);
		loadGoogleResultsBox(place, q);
	}
}
function loadGoogleResultsBox(place, q) {
	$('#' + place.id + '_results_row').append('<td id="' + place.id + '_google_results"></td>');
	$('<iframe>', {
		src: '../search.html?q=' + q,
		id: place.id + '_google_results_iframe',
		frameborder: 0,
		scrolling: 'yes'
	}).appendTo('#' + place.id + '_google_results');
}
function loadFacebookResultsBox(place, q) {
	var urlCall = '/search?q=' + q + '&type=page&fields=id,name,about,contact_address,description,engagement,general_info,link,phone,single_line_address,website&access_token=EAACEdEose0cBAJQGW2gYd7jZBZB6zZArlPYUl20qHgRgzofScOJAPZBiPAAawDBJ5cmQdM1417578qYk4mINgHgz8fU2yyr6NCZAeZBcm6ZAxj72CvEaq2BxTJUYaP5TSpWKZBURAiZAECaHb7jmUxTzmHjyO2CWO2sGt14yctMB1C7H3XklID6wD3SvPco5nccsZD';
	var blurb;
	var engagement;
	var contact;
	$('#' + place.id + '_results_row').append('<td id="' + place.id + '_facebook_results"></td>');
	$('#' + place.id + '_facebook_results').append('<ul id="' + place.id + '_facebook_results_list"></ul>');
	FB.api(
		urlCall,
		function(response) {
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
						engagement = '<p>' + response.data[i].engagement.social_sentence + '</p>';
					}
					contact = '';
					if (
						(response.data[i].contact_address) ||
						(response.data[i].phone) ||
						(response.data[i].single_line_address) ||
						(response.data[i].website)
					) {
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
					$('#' + place.id + '_facebook_results_list').append('<li>'
					+ '<a href="' + response.data[i].link + '" title="' + response.data[i].name + '" target="_blank">' + response.data[i].name + '</a><br>'
					+ blurb
					+ engagement
					+ contact
					+ '</li>');
				}
			} else {
				$('#' + place.id + '_facebook_results_list').append('<p class="empty">We got nothing from Facebook. Maybe you can start something?</p>')
			}
		}
	);
}
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			console.log("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			console.log("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			console.log("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			console.log("An unknown error occurred.");
			break;
	}
}