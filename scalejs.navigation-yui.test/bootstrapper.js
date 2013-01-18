/*global require*/
/// <reference path="Scripts/require.js"/>
/// <reference path="Scripts/jasmine.js"/>
require({
    "paths":  {
        "linq":  "Scripts/linq",
        "rx":  "Scripts/rx",
        "rx.binding":  "Scripts/rx.binding",
        "rx.time":  "Scripts/rx.time",
        "scalejs":  "Scripts/scalejs-0.1.12",
        "scalejs.linq":  "Scripts/scalejs.linq-0.1.0",
        "scalejs.navigation-yui":  "Scripts/scalejs.navigation-yui-0.1.0",
        "scalejs.reactive":  "Scripts/scalejs.reactive-0.1.0",
        "yui":  "Scripts/yui"
    },
    "scalejs":  {
        "extensions":  [
            "scalejs.linq",
            "scalejs.navigation-yui",
            "scalejs.reactive"
        ]
    },
    "shim":  {
        "linq":  {
            "exports":  "Enumerable"
        }
    }
}, ['tests/all.tests']);
