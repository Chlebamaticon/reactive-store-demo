/* eslint-disable */

import React, { PureComponent } from 'react';
import {Subject} from "rxjs";
import {of} from "rxjs";
import {publishReplay, refCount, merge, scan, map, skip} from "rxjs/operators";
import {createContext} from "react";

export function createStoreContext({actions, state$}) {
    const allMergedActions = Object.entries(actions)
        .reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value
        }), {});

    const {Consumer, Provider} = createContext({
        actions: allMergedActions,
        state$
    });

    const defaultStateSelector = () => ({});
    const defaultActionsSelector = actions => actions;

    const withStore = (selector = defaultStateSelector, actionsSelector = defaultActionsSelector) => (DecoratedComponent) => (props = {}) => {
        class X extends PureComponent {
            render() {
                return <DecoratedComponent {...this.props} />
            }
        }

        class WithStore extends PureComponent {
            componentDidMount() {
                const {ctxState: { state$, actions }} = this.props;

                // this.subscription = state$.pipe(map(selector)).subscribe(console.log);
                this.subscription = state$.pipe(map(selector)).subscribe(this.setState.bind(this));
                this.actions = actionsSelector(actions);
            }

            componentWillUnmount() {
                this.subscription.unsubscribe();
            }

            render() {
                return <X {...this.state} {...this.actions} {...props} />;
            }
        }

        return (
            <Consumer>
                {ctxState => (<WithStore ctxState={ctxState}/>)}
            </Consumer>
        );
    };

    return {
        Provider,
        Consumer,
        withStore
    }
}

export function createState(storeName, initialState, actionsFactories) {
    const actionsArr = Object
        .entries(actionsFactories)
        .map(([key, action]) => {
            const subjectForAction = new Subject();
            const actionObservable = action(subjectForAction);

            return { key, actionObservable };
        });

    const actions = actionsArr.reduce((acc, val) => {
        const { key, actionObservable } = val;

        return {
            ...acc,
            [key]: (value) => actionObservable.next(value)
        }
    }, {});

    const state$ = of(initialState).pipe(
        merge(...actionsArr.map(({actionObservable}) => actionObservable)),
        scan((state, reducerFn) => reducerFn(state)),
    );

    return {
        state$,
        actions,
        storeName,
        initialState
    }
}

export function createRootState(...localStates) {
    let localStateObservers = [];
    let rootInitialState = {};
    let rootActions = {};

    localStates.forEach(({state$: internalState, storeName, initialState, actions}) => {
        localStateObservers.push(internalState.pipe(
            map(state => [storeName, state]),
            skip(1) //skip initial values for every state
        ));

        rootInitialState = {
            ...rootInitialState,
            [storeName]: initialState
        };

        rootActions = {
            ...rootActions,
            ...actions
        };
    });

    const state$ = of(rootInitialState).pipe(
        merge(...localStateObservers),
        scan((state, [storeName, state2]) => ({...state, [storeName]: state2})),
        publishReplay(1),
        refCount()
    );

    return {
        actions: rootActions,
        state$
    }
}


//
// //@ts-ignore all
// window.x = x;
//
// //@ts-ignore all
// const y = createRootState(x, u);
// //@ts-ignore all
// window.y = y;
//
// // x.state$.subscribe((w:any) => console.log('From one state', w));
// y.state$.subscribe((w) => console.log('From global store', w));
//
// export const {
//     withStore
// } = createStoreContext(y);
