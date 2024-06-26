import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
//CREATE STORE
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
export default store;

// const initialStateAccount = {
// 	balance: 0,
// 	loan: 0,
// 	loanPurpose: '',
// };

// const initialStateCustomer = {
// 	fullName: '',
// 	nationalID: '',
// 	createdAt: '',
// };

// //REDUCER
// function accountReducer(state = initialStateAccount, action) {
// 	switch (action.type) {
// 		case 'account/deposit':
// 			return { ...state, balance: state.balance + action.payload };
// 		case 'account/withdraw':
// 			return { ...state, balance: state.balance - action.payload };
// 		case 'account/requestLoan':
// 			if (state.loan > 0) return state;
// 			// ! LATER
// 			return {
// 				...state,
// 				loan: action.payload.amount,
// 				loanPurpose: action.payload.purpose,
// 				balance: state.balance + action.payload.amount,
// 			};
// 		case 'account/payLoan':
// 			return {
// 				...state,
// 				loan: 0,
// 				loanPurpose: '',
// 				balance: state.balance - state.loan,
// 			};
// 		default:
// 			return state;
// 	}
// }

// function customerReducer(state = initialStateCustomer, action) {
// 	switch (action.type) {
// 		case 'customer/createCustomer':
// 			return {
// 				...state,
// 				fullName: action.payload.fullName,
// 				nationalID: action.payload.nationalID,
// 				createdAt: action.payload.createdAt,
// 			};
// 		case 'customer/updateName':
// 			return { ...state, fullName: action.payload };
// 		default:
// 			return state;
// 	}
// }

// //ACTION CREATORS

// function deposit(amount) {
// 	return { type: 'account/deposit', payload: amount };
// }

// function withdraw(amount) {
// 	return { type: 'account/withdraw', payload: amount };
// }

// function requestLoan(amount, purpose) {
// 	return {
// 		type: 'account/requestLoan',
// 		payload: { amount, purpose },
// 	};
// }

// function payLoan() {
// 	return {
// 		type: 'account/payLoan',
// 	};
// }

// function createCustomer(fullName, nationalID) {
// 	return {
// 		type: 'customer/createCustomer',
// 		payload: { fullName, nationalID, createdAt: new Date().toISOString() },
// 	};
// }

// function updateName(fullName) {
// 	return {
// 		type: 'customer/updateName',
// 		payload: { fullName },
// 	};
// }
