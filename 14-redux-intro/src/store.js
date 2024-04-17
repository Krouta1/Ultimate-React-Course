import { createStore } from 'redux';

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};
//REDUCER
function reducer(state = initialState, action) {
	switch (action.type) {
		case 'account/deposit':
			return { ...state, balance: state.balance + action.payload };
		case 'account/withdraw':
			return { ...state, balance: state.balance - action.payload };
		case 'account/requestLoan':
			if (state.loan > 0) return state;
			// ! LATER
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};
		case 'account/payLoan':
			return {
				...state,
				loan: 0,
				loanPurpose: '',
				balance: state.balance - state.loan,
			};
		default:
			return state;
	}
}
//CREATE STORE
const store = createStore(reducer);

//ACTION CREATORS

function deposit(amount) {
	return store.dispatch({ type: 'account/deposit', payload: amount });
}

function withdraw(amount) {
	return store.dispatch({ type: 'account/withdraw', payload: amount });
}

function requestLoan(amount, purpose) {
	return store.dispatch({
		type: 'account/requestLoan',
		payload: { amount, purpose },
	});
}

function payLoan() {
	return store.dispatch({
		type: 'account/payLoan',
	});
}
