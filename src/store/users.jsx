import { map } from "rxjs/operators";
import { createState } from "../lib/store";

export const usersList = createState(
    {
        list: [
            {
                id: 1,
                name: 'John',
                email: 'john@doe.com'
            }
        ]
    },
    {
        addUser(subject) {
            return subject
                .pipe(
                    map(user => (state) => {

                        return {
                            ...state,
                            list: [
                                {
                                    id: Math.round(Math.random()*1e6),
                                    ...user
                                },
                                ...state.list,
                            ],
                        }
                    }),
                )
        },
        removeUser(subject) {
            return subject
                .pipe(map(userId => (state) => ({
                    ...state,
                    list: state.list.filter(user => user.id !== userId)
                })))
        },
    }
);
