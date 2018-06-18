export default class {

    constructor($scope, $uibModalInstance, uiCalendarConfig, $compile, $location, $anchorScroll, events) {
        this.$uibModalInstance = $uibModalInstance;
        this.uiCalendarConfig = uiCalendarConfig;

        this.isDisplayed = false;
        this.events = events;
        this.eventSources = [this.events];

        this.$location = $location;
        this.$anchorScroll = $anchorScroll;

        this.$scope = $scope;
        this.$compile = $compile;

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
                    this.gotoPanel();
                },
                eventRender: (event, element) => {

                    element.attr({'uib-tooltip': event.title});
                    $compile(element)($scope);
                },
                eventAfterAllRender: () => {
                    if(this.events.length > 0 && !this.isDisplayed) {

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


    gotoPanel() {
        this.$location.hash('class-info-panel');

        this.$anchorScroll();
    }

    changeView(view, calendar) {
        this.uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    }

    closeModal() {
        this.$uibModalInstance.close(this.selectedClass);
    }
}