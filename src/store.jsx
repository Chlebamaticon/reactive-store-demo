/* eslint-disable */

import React, {Fragment, PureComponent} from 'react';
import {Subject} from "rxjs";
import {of} from "rxjs";
import {publishReplay, refCount, merge, scan, map, skip} from "rxjs/operators";
import {createContext} from "react";

// console.log('useContext', useContext);

// eslint-disable-next-line
function createStoreContext({ actions$, state$ }) {
  const actions = Object.entries(actions$)
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: (val) => value.next(val)
    }), {});

  const {Consumer, Provider} = createContext({
    actions,
    state$
  });

  function withStore(selector) {
    return (DecoratedComponent) => (props = {}) => {
      class WithStore extends PureComponent {
        componentDidMount() {
          const {ctxState} = this.props;

          this.subscription = ctxState.state$.pipe(map(selector)).subscribe(this.setState.bind(this));
        }

        componentWillUnmount() {
          this.subscription.unsubscribe();
        }

        render() {
          const { ctxState: { actions } } = this.props;

          return <DecoratedComponent {...this.state} {...props} actions={actions}/>;
        }
      }

      return (
        <div>
          <Consumer>
            {ctxState => (<WithStore ctxState={ctxState}/>)}
          </Consumer>
        </div>
      );
    };
  }

  return {
    Provider,
    Consumer,
    withStore
  }
}

function createState(storeName, initialState, actions) {
// function createState<T, Y extends StateActionsFactories<Y, T>>(storeName:string, initialState:T, actions:Y):StateObject<T, StateActionsSubjects<Y, T>> {
  const actionsArr = Object
    .entries(actions)
    .map(([key, action]) => {
      const subjectForAction = new Subject();
      const actionObservable = action(subjectForAction);

      return {key, actionObservable};
    });

  const actions$ = actionsArr.reduce((acc, val) => {
    const {key, actionObservable} = val;

    return {
      ...acc,
      [key]: actionObservable
    }
  }, {});

  const state$ = of(initialState).pipe(
    //@ts-ignore
    merge(...actionsArr.map(({actionObservable}) => actionObservable)),
    //@ts-ignore
    scan((state, reducerFn) => reducerFn(state)),
  );

  return {
    state$,
    actions$,
    storeName,
    initialState
  }
}

function createRootState(...localStates) {
  let localStateObservers = [];
  let rootInitialState = {};

  localStates.forEach(({state$: internalState, storeName, initialState}) => {
    localStateObservers.push(internalState.pipe(
      map(state => [storeName, state]),
      skip(1) //skip initial values for every
    ));

    rootInitialState = {
      ...rootInitialState,
      [storeName]: initialState
    }
  });

  const state$ = of(rootInitialState).pipe(
    //@ts-ignore
    merge(...localStateObservers),
    //@ts-ignore
    scan((state, [storeName, state2]) => ({...state, [storeName]: state2})),
    publishReplay(1),
    refCount()
  );

//@ts-ignore
  const actions$ = localStates.reduce((acc, {actions$}) => {
    return {
      ...acc,
      ...actions$
    }
  }, {});

  return {
    actions$,
    state$
  }
}

const x = createState(
  'counter',
  {
    counter: 0,
    val: 'abc'
  },
  {
    increment(subject) {

      return subject
        .pipe(
          // merge(interval(1000)),
          map(value => (state) => {

            return {
              ...state,
              counter: value,
            }
          }),
          // delay(1000)
        )
    }
  }
);

const u = createState(
  'test',
  {
    val: 123
  },
  {
    setValue(subject) {

      return subject
        .pipe(
          map(value => (state) => {

            return {
              ...state,
              val: value,
            }
          }),
          // delay(1000)
        )
    }
  }
);

//@ts-ignore all
window.x = x;

//@ts-ignore all
const y = createRootState(x, u);
//@ts-ignore all
window.y = y;

// x.state$.subscribe((w:any) => console.log('From one state', w));
y.state$.subscribe((w) => console.log('From global store', w));

export const {
  withStore
} = createStoreContext(y);
