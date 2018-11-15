import { createRootState, createStoreConnectComponent } from "../lib/store";
import { counter } from "./counter";
import { usersList } from "./users";

export { counter, usersList };

export const rootState = createRootState(
    counter,
    usersList
);

export const {
    Consumer,
    Provider,
    withStore
} = createStoreConnectComponent(rootState);

