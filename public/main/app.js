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
        .state('kpiAdd', {
            url: '/kpiAdd',
            templateUrl: './main/kpi/kpi_add/kpi_add.html',
            controller: 'kpiAddCtrl'
        })
        .state('kpiDelete', {
            url: '/kpidelete',
            templateUrl: './main/kpi/kpi_delete/kpi_delete.html',
            controller: 'kpiDeleteCtrl'
        })
        .state('kpiHistory', {
            url: '/kpihistory',
            templateUrl: './main/kpi/kpi_history/kpi_history.html',
            controller: 'kpiHistoryCtrl'
        })
        .state('kpiUpdate', {
            url: '/kpiupdate',
            templateUrl: './main/kpi/kpi_update/kpi_update.html',
            controller: 'kpiUpdateCtrl'
        })
        .state('userUpdate', {
            url: '/userupdate',
            templateUrl: './main/user/user_update/user_update.html',
            controller: 'userUpdateCtrl'
        })
        .state('store', {
            url: '/store',
            templateUrl: './main/store/store.html',
            controller: 'storeCtrl'
        })
        .state('cart', {
            url: '/cart',
            templateUrl: './main/store/cart/cart.html',
            controller: 'cartCtrl'
        })
    $urlRouterProvider
        .otherwise('/')
})