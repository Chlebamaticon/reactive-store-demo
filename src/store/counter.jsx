/* eslint-disable */

import {map, merge, bufferTime, publishReplay, refCount} from "rxjs/operators";
import { interval } from "rxjs";
import { createState } from "../lib/store";

export const counter = createState(
    'counter',
    {
        counter: 0,
        val: 'abc'
    },
    {
        increment(subject) {
          return subject
                .pipe(
                    merge(interval(100)),
                    bufferTime(500),
                    map((value = []) => (state) => {
                      return {
                            ...state,
                            counter: value.reduce((a,v) => a+v, 0),
                        }
                    }),
                )
        }
    }
);

console.log('counter', counter);
