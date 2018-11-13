import { map, merge } from "rxjs/operators";
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
                    merge(interval(1000)),
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
