(function () {
  'use strict';
  var mod = angular.module('jh.calendar', []);
  mod.directive('calendar', [
    '$locale',
    function ($locale) {
      return {
        restrict: 'E',
        templateUrl: 'calendar.tmpl',
        scope: {
          'for': '=',
          options: '=',
          click: '='
        },
        link: function (scope) {
          scope.$watch('for', function () {
            var start = scope['for'] && new Date(scope['for'].getTime()) || new Date();
            start.setDate(1);
            var nextMonth = (start.getMonth() + 1) % 12;
            scope.month = $locale.DATETIME_FORMATS.MONTH[start.getMonth()];
            scope.year = start.getFullYear();
            scope.days = $locale.DATETIME_FORMATS.DAY;
            scope.weeks = [{ days: [] }];
            var week = scope.weeks[0];
            do {
              if (start.getDay() === 0 && start.getDate() !== 1) {
                week = { days: [] };
                scope.weeks.push(week);
              }
              week.days[start.getDay()] = start.getDate();
              start.setDate(start.getDate() + 1);
            } while (start.getMonth() !== nextMonth);
            while (week.days.length < 7) {
              week.days.push(undefined);
            }
          });
        }
      };
    }
  ]);
  var calendarTemplate = [
      '<div class="calendar">',
      '<div class="header">{{month}} {{year}}</div>',
      '<div class="week-header">',
      '<span ng-repeat="day in days track by $index" class="day-name" ng-class="{first: $first, last: $last}">{{day}}</span>',
      '</div>',
      '<div class="calendar-body">',
      '<div ng-repeat="week in weeks track by $index" class="week" ng-class="{first: $first, last: $last}">',
      '<span ng-repeat="day in week.days track by $index" class="day" ng-class="{first: $first, last: $last}" ng-click="day != undefined && click(day)">{{day}}&nbsp;</span>',
      '</div>',
      '</div>',
      '</div>'
    ].join('\n');
  mod.run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('calendar.tmpl', calendarTemplate);
    }
  ]);
}());