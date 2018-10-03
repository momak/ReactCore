const requestEmployeeType = 'REQUEST_EMPLOYEE';
const receiveEmployeeType = 'RECEIVE_EMPLOYEE';
const initialState = { employees: [], isLoading: false };

export const actionCreators = {
    requestEmployee: startDateIndex => async (dispatch, getState) => {
        if (startDateIndex === getState().employees.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestEmployeeType });

        const url = 'api/Employee/Index';  
        const response = await fetch(url);
        const employees = await response.json();

        dispatch({ type: receiveEmployeeType, employees });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestEmployeeType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveEmployeeType) {
        return {
            ...state,
            employees: action.employees,
            isLoading: false
        };
    }

    return state;
};
