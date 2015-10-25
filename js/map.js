
// necessary variables
var map;
var infoWindow;

// markersData variable stores the information necessary to each marker
var markersData = [
   {
      lat: -43.53,
      lng: 172.62,
      title: "The garden city, Christchurch",
      subtitle1:"Introduction",
      subtitle2: "Tips",
      introduction: "Christchurch is a garden city on the east coast of New Zealand’s South Island, set on the Canterbury Plains. Flat-bottomed punts glide on the Avon River, which runs through the city centre. On its banks are cycling paths, the green expanse of Hagley Park and the Christchurch Botanic Gardens. In 2010 and 2011, 2 major earthquakes destroyed many city-centre buildings, and restoration work continues.",
      tips: " Departure Tax at the Airport,  at nite, Air pollution in winter" ,
      images:"images/c.JPG" // don't insert comma in the last item of each marker
   },
   {
      lat: -45.87,
      lng: 170.56,
      title: "Dramatic coastal Otago, Dunedin",
       subtitle1:"Introduction",
      subtitle2: "Tips",
      introduction: "Dunedin is a city in New Zealand, at the head of Otago Harbour on the South Island’s southeast coast. It's known for its Scottish and Maori heritage, Victorian and Edwardian architecture and a large student population. Hiking and cycling trails crisscross the dramatic landscape of the adjoining Otago Peninsula, home to colonies of albatrosses, sea lions and rare yellow-eyed penguins.",
      tips: "Taieri Gorge Railway, Train Station, Steepest Street",
      images:"images/d.JPG" // don't insert comma in the last item of each marker
   },
   {
      lat: -45.03,
      lng: 168.66,
      title: "Favourite visitor destination,Queenstown",
      subtitle1:"Introduction",
      subtitle2: "Tips",
      introduction: "Queenstown, New Zealand, sits on the shore of the South Island’s Lake Wakatipu, set against the dramatic Southern Alps. The surrounding Central Otago region is known for its Pinot Noir and Chardonnay vineyards, and for adventure sports. In winter, there's backcountry skiing and the country’s highest vertical drops. Summer brings paragliding, mountain biking and bungee-jumping (Kawarau Gorge Suspension Bridge is among the sport's original sites).",
      tips: "Skyline Gondola and Restaurant, Jet Boating, Bungy Jumping",
      images:"images/queenstown.JPG" // don't insert comma in the last item of each marker
   }, 
   {
      lat: -43.46,
      lng: 170.02,
      title: "13 km long glacier, Fox Glacier",
      subtitle1:"Introduction",
      subtitle2: "Tips",
      introduction: "The Fox Glacier is a 13 km long glacier located in Westland Tai Poutini National Park on the West Coast of New Zealand's South Island. It was named in 1872 after a visit by the then Prime Minister of New Zealand, Sir William Fox",
      tips: "Fox Glacier by helicopter, Lake Matheson, Walk up to Fox Glacier" ,
      images:"images/photo-2.jpg"// don't insert comma in the last item of each marker
   } // don't insert comma in the last item
];


function initialize() {

   // Create an array of styles.
  var styles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f7ded9"
            },
            {
                "visibility": "on"
            }
        ]
    }
];
    // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});


   var mapOptions = {
      center: new google.maps.LatLng( -43.46 ,170.02),
      zoom: 9,
      mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
   map.mapTypes.set('map_style', styledMap);
   map.setMapTypeId('map_style');

   // a new Info Window is created
   infoWindow = new google.maps.InfoWindow({
      maxWidth: 350

   });


   // Event that closes the Info Window with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

      // Finally displayMarkers() function is called to begin the markers creation
   displayMarkers();

    google.maps.event.addListener(infoWindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    
    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid rgb(53,50,65)', 'border-radius': '13px', 'box-shadow': '0 0 5px rgb(53,50,65)'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
    
  });
  
 
  
};
google.maps.event.addDomListener(window, 'load', initialize);


// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();
   
   // for loop traverses markersData array calling createMarker function for each marker 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var title = markersData[i].title;
      var subtitle1 = markersData[i].subtitle1;
      var subtitle2 = markersData[i].subtitle2;
      var introduction = markersData[i].introduction;
      var tips = markersData[i].tips;
      var images = markersData[i].images;

      createMarker(latlng, title, subtitle1, subtitle2, introduction,tips,images);

      // marker position is added to bounds variable
      bounds.extend(latlng);  
   }

   // Finally the bounds variable is used to set the map bounds
   // with fitBounds() function
   map.fitBounds(bounds);

}

// This function creates each marker and it sets their Info Window content
function createMarker(latlng, title, subtitle1, subtitle2, introduction, tips, images){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: title,
      animation: google.maps.Animation.DROP
   });

   // This event expects a click on a marker
   // When this event is fired the Info Window content is created
   // and the Info Window is opened.
      // Creating the content to be inserted in the infowindow
      var iwContent = '<div id="iw-container">' +
            '<div class="iw-title">' + title + '</div>' +
         '<div class="iw-content">' + '<div class="iw-subTitle">' + subtitle1 + '</div>' + '<img src="' + images + '" />'+'<p>'+ introduction + '</p>' + 
         '<div class="iw-subTitle">' + subtitle2 + '</div>' + '<p>' + tips + '<p>' + '</div>' +
         '<div class="iw-bottom-gradient"></div>' + '</div>';



   google.maps.event.addListener(marker, 'click', function() {
      
      // including content to the Info Window.
      infoWindow.setContent(iwContent);

      // opening the Info Window in the current map and at the current marker location.
      infoWindow.open(map, marker);

   });


  
}




