/* global mod */

mod.directive('calendar', function ($locale) {
    return {
        restrict: 'E',
        templateUrl: 'calendar.tmpl',
        scope: { 'for': '=', options: '=', onClick: '&' , activeDay: '&', activeWeek: '&'},
        link: function (scope) {
            scope.$watch('for', function () {
                var date = scope['for'];
                console.log(date);
                var start = (date instanceof Date && new Date(date.getTime())) || new Date();
                start.setDate(1);
                var nextMonth = (start.getMonth() + 1) % 12;

                scope.month = $locale.DATETIME_FORMATS.MONTH[start.getMonth()]; // nome localizzato del mese corrente
                scope.days = $locale.DATETIME_FORMATS.DAY; // array con i nomi dei giorni della settimana localizzati
                scope.year = start.getFullYear();
                scope.weeks = [ { days: [] } ];

                var week = scope.weeks[0];

                do {
                    var day_of_week = start.getDay(); // giorno della settimana (domenica: 0, lunedi': 1, ecc.)
                    if(day_of_week === 0 && start.getDate() !== 1) {
                        week = { days: [] };
                        scope.weeks.push(week);
                    }
                    week.days[day_of_week] = start.getDate();
                    start.setDate(start.getDate()+1);
                } while(start.getMonth() !== nextMonth);
                
                while(week.days.length < 7) {
                    week.days.push(undefined);
                }
            });
            scope.clickDay = function (day) {
                if(day !== undefined) {
                    return scope.onClick({day: day});
                }
            };
            scope.isDayActive = function (day) {
                return scope.activeDay({day: day});
            };
            scope.isWeekActive = function (week) {
                return scope.activeWeek({week: week});
            };
        }
    };
});
