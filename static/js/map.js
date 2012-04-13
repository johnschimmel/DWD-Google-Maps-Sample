var map;
var mapMarkers = [];
var currMarker;

var initialize = function() {
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(40.729405, -73.99386),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
    
    // now create markers from myLocations
    displayMarkers();
}

var displayMarkers = function() {
    
    for(i = 0; i<myLocations.length; i++) {
        
        currLocation= myLocations[0];
        
        // create info window
        var infowindow = new google.maps.InfoWindow({
                content: "<h4>" + currLocation.title + "</h4>"
            });
        
        // create the map marker
        var tmpMarker = new google.maps.Marker({
                position: new google.maps.LatLng( currLocation.position.lat, currLocation.position.lng), 
                map: map,
                title: currLocation.title
            });
        
        // create click event - when marker is clicked open the 
        google.maps.event.addListener(tmpMarker, 'click', function() {
            
            // open the marker info window
            infowindow.open(map,tmpMarker);

            // keep track of which marker was clicked on
            currMarker = tmpMarker;
        });
            
        // put new marker into the global mapMarkers array
        mapMarkers.push(tmpMarker);

        
    }
    
}


var loadScript = function() {

    // let's load the Google Maps API  into the web page
    // when the API is loaded, trigger the initalize function above
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&' +
        'callback=initialize';
    document.body.appendChild(script);
}