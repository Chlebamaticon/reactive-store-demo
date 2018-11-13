import { createRootState, createStoreContext } from "../lib/store";
import { counter } from "./counter";
import { usersList } from "./users";

export const rootState = createRootState(
    counter,
    usersList
);

export const {
    Consumer,
    Provider,
    withStore
} = createStoreContext(rootState);

