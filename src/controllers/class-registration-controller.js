export default class {

    constructor($scope, $uibModal, $q, $sce, $compile, uiCalendarConfig) {

        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.$q = $q;
        this.$sce = $sce;

        this.uiCalendarConfig = uiCalendarConfig;

        this.classes = this._loadEvents();
        console.log('classes', this.classes);

        this.eventSources = [this.classes];

        this.showCalendar = true;

        this.uiConfig = {
            calendar: {
                height: 450,
                editable: false,
                header: {
                    left:'title',
                    center:'',
                    right: 'today prev,next'
                },
                eventClick: (event) => {
                    this.selectedClass = event;
                    this.showCalendar = false;
                },
                eventRender: (event, element) => {
                    element.attr({'uib-tooltip': event.title});
                    $compile(element)($scope);
                },
                eventAfterAllRender: () => {
                    if(this.classes.length > 0 && !this.isDisplayed) {

                        this.isDisplayed = true;

                        // yucky thing we have to do for the fullcalendar to display properly
                        setTimeout(() => {
                            uiCalendarConfig.calendars.classCalendar.fullCalendar();
                        }, 0);
                    }
                }
            }
        }

    }

    changeView(view, calendar) {
        this.uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    }

    onSubmit() {

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
                }
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

    _loadEvents() {

        let classData = [{
            classId: 2391,
            name: "Beginning Adult Dance",
            description: "A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>",
            instructor: {name: "Ms Marie", profilePicture: require('../images/profile.jpg')},
            duration: 2.0,
            date: "6/15/2018",
            time: "1:00 PM"
        },
            {
                classId: 2392,
                name: "Beginning Teen Dance",
                description: "A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>",
                instructor: {name: "Ms Marie", profilePicture: require('../images/profile.jpg')},
                duration: 2.0,
                date: "6/15/2018",
                time: "4:00 PM"
            },
            {
                classId: 2393,
                name: "Advanced Adult Dance",
                description: "A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>",
                instructor: {name: "Ms Marie", profilePicture: require('../images/profile.jpg')},
                duration: 2.0,
                date: "6/17/2018",
                time: "1:00 PM"
            },
            {
                classId: 2394,
                name: "Advanced Teen Dance",
                description: "A beginners class in dance for basics such as ..., ..., and ...<br/><h1>This is a test</h1>",
                instructor: {name: "Ms Marie", profilePicture: require('../images/profile.jpg')},
                duration: 2.0,
                date: "6/17/2018",
                time: "4:00 PM"
            }];

        return underscore.map(classData, (c) => { return {
            classId: c.classId,
            name: c.name,
            description: this.$sce.trustAsHtml(c.description),
            instructor: c.instructor,
            duration: c.duration,
            start: this._formatDate(c.date, c.time),
            end_time: this._addDateHours(this._formatDate(c.date, c.time), c.duration),
            title: c.name,
            allDay: false
        }});
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

