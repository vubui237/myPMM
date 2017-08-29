angular.module('myPMM',['ui.router', 'chart.js']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './main/home/home.html',
            controller: 'homeCtrl'
        })
        .state('kpi', {
            url: '/kpi',
            templateUrl: './main/kpi/kpi.html',
            controller: 'kpiCtrl'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: './main/dashboard/dashboard.html',
            controller: 'dbCtrl'
        })
    $urlRouterProvider
        .otherwise('/')
})