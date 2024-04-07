import {handleActions} from 'redux-actions';
import { actionType } from './actions';
import { BOOK_CONTEXT_INITIAL_STATE } from './context';


export const bookReducer = handleActions({
    [actionType.GET_BOOK_BY_GENRE]:(state, action) => {
        // console.log("get books_______________", action.payload.books);
        // console.log("get books by genre ACTION triggered", action.payload.books.result);
        return {
            ...state,
            book:action.payload.books
        }
    },

    [actionType.RENT_BOOK]:(state, action) => {
        console.log("Rent book action triggered");
        return {
            ...state
        }
    },

    [actionType.RENT_BOOK]:(state, action) => {
        console.log("Get Book status action triggered");
        return {
            ...state
        }
    },

    [actionType.GET_RECOMMENDED_BOOKS]:(state, action) => {
        // console.log("Get Book status action triggered");
        return {
            ...state
        }
    },
    [actionType.GET_MOST_BORROWED_BOOKS]:(state, action) => {
        // console.log("Get Book status action triggered");
        return {
            ...state
        }
    },
    [actionType.GET_ALL_BOOKS]:(state, action) => {
        console.log("Get all books action triggered");
        return {
            ...state,
            books:action.payload.books
        }
    }

}, BOOK_CONTEXT_INITIAL_STATE);