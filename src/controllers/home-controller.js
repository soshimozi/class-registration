/* global mapboxgl */

export default class {

    constructor() {
        this.yogaPhotos = [require('../images/yoga-1.jpg'), require('../images/yoga-2.jpg'), require('../images/yoga-3.jpg'), require('../images/yoga-4.jpg')];

        this.companyAddress = "32999 Yucaipa Boulevard, Suite 118, Yucaipa, California 92399, United States";
        this.companyPhone = "(909) 283-8046";
        this.companyName = "CENTERED YOGA & DANCE";
        this.companyTagLine = "UNITING MIND, BODY, AND SOUL";

        this._initializeMap();
    }

    _initializeMap() {

        mapboxgl.accessToken = 'pk.eyJ1Ijoic29zaGltbyIsImEiOiJjamlsMDY5ZmkyYWtwM3Bwbmk1Y3Zta3V2In0.3k7wZ5-r4uTUMEcTdyB6MQ';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10?optimize=true',
            center: [-117.08483, 34.032741], // starting position
            zoom: 14 // starting zoom
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());


        map.on('load', function() {
            map.loadImage(require('../images/map-marker-icon.png'), function(error, image) {

                if (error) throw error;
                map.addImage('map-pointer', image);
                map.addLayer({
                    "id": "places",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "properties": {
                                    "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>"
                                },
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [-117.08483, 34.032741]
                                }
                            }]
                        }
                    },
                    "layout": {
                        "icon-image": 'map-pointer',
                        "icon-allow-overlap": true,
                        "icon-size": .75
                    }
                });
            });
        });

        // // Change the cursor to a pointer when the mouse is over the places layer.
        // map.on('mouseenter', 'places', function () {
        //     map.getCanvas().style.cursor = 'pointer';
        // });
        //
        // // Change it back to a pointer when it leaves.
        // map.on('mouseleave', 'places', function () {
        //     map.getCanvas().style.cursor = '';
        // });
        //
        // // When a click event occurs on a feature in the places layer, open a popup at the
        // // location of the feature, with description HTML from its properties.
        // map.on('click', 'places', function (e) {
        //     var coordinates = e.features[0].geometry.coordinates.slice();
        //     var description = e.features[0].properties.description;
        //
        //     // Ensure that if the map is zoomed out such that multiple
        //     // copies of the feature are visible, the popup appears
        //     // over the copy being pointed to.
        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //     }
        //
        //     new mapboxgl.Popup()
        //         .setLngLat(coordinates)
        //         .setHTML(description)
        //         .addTo(map);
        // });

    }

}

