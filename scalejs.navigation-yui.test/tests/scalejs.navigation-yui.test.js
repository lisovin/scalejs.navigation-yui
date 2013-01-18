/*global define,describe,expect,it*/
/*jslint sloppy: true*/
/// <reference path="../Scripts/jasmine.js"/>
define([
    'scalejs!core',
    'scalejs!application'
], function (core) {
    var navigation = core.navigation;

    describe('navigation extension', function () {
        it('is defined', function () {
            expect(navigation).toBeDefined();
        });
    });
});