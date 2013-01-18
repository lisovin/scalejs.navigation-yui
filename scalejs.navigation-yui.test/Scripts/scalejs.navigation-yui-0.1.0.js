
define('yui!history',['yui!base,history'], function (Y) { return Y;});

/*global define*/
define('scalejs.navigation-yui/history',[
    'yui!history',
    'scalejs/core'
], function (
    Y,
    core
) {
    

    var history = new Y.HistoryHash();

    function add(state) {
        history.add(state);
    }

    function addValue(key, value, options) {
        history.addValue(key, value, options);
    }

    function get(key) {
        return history.get(key);
    }

    function replace(state) {
        history.replace(state);
    }

    function replaceValue(key, value, options) {
        history.replaceValue(key, value, options);
    }

    function observe() {
        var observable = core.reactive.Observable,
            disposable = core.reactive.Disposable;

        return observable.createWithDisposable(function (observer) {
            var subscription = history.on('change', function (e) {
                observer.onNext({
                    changed: e.changed,
                    removed: e.removed
                });
            });

            return disposable.create(function () {
                subscription.detach();
            });
        }).publishValue({ initial: history.get() })
            .refCount();
    }

    return {
        add: add,
        addValue: addValue,
        get: get,
        replace: replace,
        replaceValue: replaceValue,
        observe: observe
    };
});

/*global define,window*/
/*jslint todo:true*/
define('scalejs.navigation-yui/navigation',[
    './history'
], function (
    history
) {
    

    function navigation(core) {
        var has = core.object.has,
            merge = core.object.merge,
            toEnumerable = core.linq.enumerable.from,
            navigated = history
                .observe()
                .select(function (event) {
                    var retEvent,
                        changed,
                        removed;

                    if (has(event, 'initial')) {
                        retEvent = event.initial;
                    } else {
                        changed = toEnumerable(event.changed)
                            .toObject("$.Key", "$.Value.newVal");
                        removed = toEnumerable(event.removed)
                            .toObject("$.Key", "undefined");
                        retEvent = merge(history.get(), changed, removed);
                    }
                    return retEvent;
                })
                .publishValue(undefined)
                .refCount();
        // TODO: unsubscribe?

        function observe() {
            return navigated.where(function (evt) {
                return has(evt);
            });
        }

        function navigate(params) {
            var remove = toEnumerable(history.get()).toObject("$.Key", "null"),
                newstate;
            params = has(params) ? params : {};
            newstate = merge(remove, params);
            history.add(newstate);
        }

        function navigateRelative(params) {
            params = has(params) ? params : {};
            history.add(params);
        }

        function back(steps) {
            window.history.go(has(steps) ? -steps : -1);
        }

        return {
            observe: observe,
            navigate: navigate,
            navigateRelative: navigateRelative,
            back: back
        };
    }

    return navigation;
});

/*global define*/
/*jslint todo: true*/
define('scalejs.navigation-yui',[
    'scalejs!core',
    'scalejs.navigation-yui/navigation'
], function (
    core,
    navigation
) {
    

    var extend = core.object.extend;

    function buildCore() {
        var extension = navigation(core);
        extend(core, { navigation: extension });
    }

    function buildSandbox(sandbox) {
        // TODO: consider whether it's worth filtering out events
        // only for the module
        extend(sandbox, { navigation: core.navigation });
    }

    return {
        dependencies : ['reactive', 'linq'],
        buildCore    : buildCore,
        buildSandbox : buildSandbox
    };
});