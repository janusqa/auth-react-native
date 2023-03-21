import { TRootState } from './configureStore';
import {
    createSlice,
    createSelector,
    PayloadAction,
    CaseReducer,
} from '@reduxjs/toolkit';

type TSliceState = {
    token: string | null;
    isAuthenticated: boolean;
};

const getInitialState = (): TSliceState => ({
    token: null,
    isAuthenticated: false,
});

const tokenSetdReducer: CaseReducer<
    TSliceState,
    PayloadAction<{ token: string | null }>
> = (auth, action) => {
    const { token } = action.payload;
    auth.token = token;
    auth.isAuthenticated = !!token;
};

const slice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        tokenSet: tokenSetdReducer,
    },
});

const { tokenSet } = slice.actions;

// reducer
export default slice.reducer;

// actions
export const setToken = (token: { token: string | null }) => tokenSet(token);

// selectors

//*** paramatized queries */
type ParameterSelector<T> = (_: TRootState, params: T) => T[keyof T];

const createParameterSelector = <T>(
    selector: (params: T) => T[keyof T]
): ParameterSelector<T> => {
    return (_, params) => selector(params);
};

// can query slice data on params
// const getExpensIdParam: ParameterSelector<{ id: string }> =
//     createParameterSelector((params) => params.id);
//
// export const getExpenseById = createSelector(
//     [
//         (store: TRootState) => store.features.expenses.expenseList,
//         getExpensIdParam, // put each param as a seperate input selector
//     ],
//     (expenses, expenseId) =>
//         expenses.find((expense) => expense.id === expenseId) // this is the output selector
// );

// To call this in a component see example directly below
// -> const expense = useAppSelector((state) =>
// -> getExpenseById(state, { id: expenseId })
// -> );
//*** paramatized queries */

export const getToken = createSelector(
    (store: TRootState) => store.features.auth,
    (auth) => auth.token
);

export const getAuthStatus = createSelector(
    (store: TRootState) => store.features.auth,
    (auth) => auth.isAuthenticated
);
