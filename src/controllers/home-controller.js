export default class {

    constructor($scope, $uibModal, $q, $sce) {

        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.$q = $q;

        this.classes = [{
                classId: 2391,
                name: "Beginning Adult Dance",
                description: $sce.trustAsHtml("A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>"),
                instructor: {name: "Ms Marie", profilePicture: require('../images/header.jpg')},
                duration: 2.0,
                date: "6/15/2018",
                time: "1:00 PM"
            },
            {
                classId: 2392,
                name: "Beginning Teen Dance",
                description: $sce.trustAsHtml("A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>"),
                instructor: {name: "Ms Marie", profilePicture: require('../images/header.jpg')},
                duration: 2.0,
                date: "6/15/2018",
                time: "4:00 PM"
            },
            {
                classId: 2393,
                name: "Advanced Adult Dance",
                description: $sce.trustAsHtml("A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>"),
                instructor: {name: "Ms Marie", profilePicture: require('../images/header.jpg')},
                duration: 2.0,
                date: "6/17/2018",
                time: "1:00 PM"
            },
            {
                classId: 2394,
                name: "Advanced Teen Dance",
                description: $sce.trustAsHtml("A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>"),
                instructor: {name: "Ms Marie", profilePicture: require('../images/header.jpg')},
                duration: 2.0,
                date: "6/17/2018",
                time: "4:00 PM"
            }];

        // // TODO: flatten times and id will be registrationid
            // // so availableDates: [ {id: 0, date: "6/15/2018", time: "1:00 PM"}, {id: 0, date: "6/15/2018", time: "4:00 PM"} ... ],
            // availableDates: [
            //     {
            //         id: 0,
            //         date: "6/15/2018",
            //         times: [
            //             "1:00 PM",
            //             "4:00 PM"
            //         ]
            //
            //     },
            //     {
            //         id: 1,
            //         date: "6/16/2018",
            //         times: [
            //             "1:00 PM",
            //             "3:00 PM"
            //         ]
            //     }
            // ]
        //};


        //this.classes = [];
        //this.classes.push(clz);
    }

    getAvailableTimes() {
        return [
            "1:00pm",
            "3:00pm"
        ]
    }

    onSubmit() {
        console.log('onSubmit');

        var ID = function () {
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return `${Math.random().toString(36).substr(2, 5)}${Math.random().toString(10).substr(2, 4)}`.toUpperCase();
        };

        this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            template: require('../templates/register-thank-you.html'),
            size: 'lg',
            backdrop: 'static',
            keyboard: 'false',
            controller: class {
                constructor($scope, $uibModalInstance, className, registrationNumber) {

                    console.log('scope', $scope);
                    // console.log('number', registrationNumber);
                    //
                    $scope.className = className;
                    $scope.registrationNumber = registrationNumber;

                    $scope.close = () => {
                        $uibModalInstance.close()
                    };

                    // $scope.registrationNumber = registrationNumber;

                    //this.$uibModalInstance = $uibModalInstance;
                }

                // close() {
                //     this.$uibModalInstance.close();
                // }
            },
            resolve: {
                className: () => {
                    return this.selectedClass.name;
                },
                registrationNumber: () => {
                    return `${this.selectedClass.classId}${ID()}`;
                }
            }
        });

    }

    browseClasses() {

        this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            template: require('../templates/select-class-date'),
            size: 'lg',
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: 'false',
            controller: 'SelectClassDateModalController',
            resolve: {
                events: () => {
                    return underscore.map(this.classes, (c) => { return {
                        classId: c.classId,
                        name: c.name,
                        description: c.description,
                        instructor: c.instructor,
                        duration: c.duration,
                        start: this._formatDate(c.date, c.time),
                        end_time: this._addDateHours(this._formatDate(c.date, c.time), c.duration),
                        title: c.name,
                        allDay: false
                    }});
                }
            }
        }).result.then((data) => {
            this.selectedClass = data;
        }, () => {
            console.log('dialog dismissed');
        });
    }


    _loadEvents() {

        return this.$q((resolve) => {

            let events = [];

            for (let c in this.classes) {
                let selectedClass = this.classes[c];
                for (let d in selectedClass.availableDates) {
                    let availableDate = selectedClass.availableDates[d];

                    for (let t in availableDate.times) {
                        let time = availableDate.times[t];

                        //let startdatetime = this._formatDate(availableDate.date, time);
                        //let enddatetime = this._addDateHours(startdatetime, this.selectedClass.duration);

                        var event = {
                            name: selectedClass.name,
                            description: selectedClass.description,
                            instructor: selectedClass.instructor,
                            duration: selectedClass.duration,
                            start: this._formatDate(availableDate.date, time),
                            end_time: this._addDateHours(this._formatDate(availableDate.date, time), selectedClass.duration),
                            title: `${selectedClass.name}`,
                            allDay: false
                        };

                        events.push(event);
                    }
                }
            }

            console.log('events:', events);

            resolve(events);
        });

    }

    _addDateHours(dt, hrs) {
        let m = moment(dt.toISOString());
        return m.add(hrs, 'hours');
    }

    _formatDate(dt, tm) {
        let date = new Date(`${dt} ${tm}`);
        return date;
    }


}

