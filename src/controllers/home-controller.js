/* global mapboxgl */

export default class {

    constructor($interval) {
        this.yogaPhotos = [require('../images/yoga-1.jpg'), require('../images/yoga-2.jpg'), require('../images/yoga-3.jpg'), require('../images/yoga-4.jpg')];

        this.companyAddress = "32999 Yucaipa Boulevard, Suite 118, Yucaipa, California 92399, United States";
        this.companyPhone = "(909) 283-8046";
        this.companyName = "CENTERED YOGA & DANCE";
        this.companyTagLine = "UNITING MIND, BODY, AND SOUL";

        this._initializeMap();

        this.galleryPhotos = [
            {src: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg', desc: 'Image 01'},
            {src: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', desc: 'Image 02'},
            {src: 'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_b.jpg', desc: 'Image 03'},
            {src: 'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_b.jpg', desc: 'Image 04'},
            {src: 'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_b.jpg', desc: 'Image 05'},
            {src: 'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_b.jpg', desc: 'Image 06'}
        ];

        // initial image index
        this._Index = 0;

        $interval(() => {
            this.showNext()
        }, 10000, 0);

    }

    // if a current image is the same as requested image
    isActive (index) {
        return this._Index === index;
    }

    // show prev image
    showPrev () {
        this._Index = (this._Index > 0) ? --this._Index : this.galleryPhotos.length - 1;
    }

    // show next image
    showNext() {
        this._Index = (this._Index < this.galleryPhotos.length - 1) ? ++this._Index : 0;
    }

    // show a certain image
    showPhoto (index) {
        this._Index = index;
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

