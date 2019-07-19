var card = document.getElementById('pac-card');
var input = document.getElementById('pac-input');
var types = document.getElementById('type-selector');
var strictBounds = document.getElementById('strict-bounds-selector');

map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

var autocomplete = new google.maps.places.Autocomplete(input);

autocomplete.bindTo('bounds', map);

        // Set the data fields to return when the user selects a place.
autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);

var searchInfowindow = new google.maps.InfoWindow();
var searchInfowindowContent = document.getElementById('infowindow-content');
searchInfowindow.setContent(searchInfowindowContent);
var searchMarker = new google.maps.Marker({
    map: map,
    icon: '/images/orientation64.png',
    anchorPoint: new google.maps.Point(0, -29)
});

autocomplete.addListener('place_changed', function() {
    searchInfowindow.close();
    searchMarker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
         window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
        }
        
        searchMarker.setPosition(place.geometry.location);
        searchMarker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        });