'use client';
import React, { useReducer, useEffect, useState, FC, PropsWithChildren, useContext } from 'react';
import { IBook, IbookGenre, BookActionContext, BookStateContext, BOOK_CONTEXT_INITIAL_STATE } from './context';
import { bookReducer } from './reducer';
import { getBookByISBNAction, rentBookAction, getBookRentStatusAction, getAllBooksAction} from './actions';
import { httpClient } from '../httpClients/httpClients';
import { Alert, notification } from 'antd';


const BookProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, BOOK_CONTEXT_INITIAL_STATE);
    const warningMessage = () => {
        notification.open({
            message: "Rent book",
            description: <Alert message="warning"
                description="Failed to rent book, contact the desk"
                type="warning"
                showIcon />,
            duration:18.5
        })
    }

    const successMessage = (ref:number) => {
        notification.open({
            message: "Rent book",
            description: <Alert message="success"
                description={`Book rented successfully, fetch it at the desk by presenting the ref ${ref}`}
                type="success"
                showIcon />,
            duration:18.5
        })
    }

    //Book/GetBookByISBN?isbn=
    const getBookByISBN = async (isbn: string):Promise<IBook> => new Promise((resolve, reject) =>{
        httpClient.get(`/Book/GetBookByISBN?isbn=${isbn}`)
        .then(response => {
            // console.log("ISBN RESULT", response.data.result)
            resolve(response.data.result)
            dispatch(getBookByISBNAction(response.data.result));
        }).catch(error => {
            reject(error);
            console.log("error searching book", error)
        })
    })

    const rentBook = async (bookId:string, userId:number) =>{
        httpClient.post(`/BookManager/RentBook?bookId=${bookId}&userId=${userId}`)
        .then(Response => {
            dispatch(rentBookAction());
            successMessage(userId);
        }).catch(error => {
            console.log("Error, renting book");
            warningMessage();
        })
    }

    // check if books is rented
    const isBookRented = (bookId:string, userId:number):Promise<any> => new Promise((resolve, reject) =>{
        httpClient.get(`/BookManager/isRented?bookId=${bookId}&userId=${userId}`)
        .then((response) =>{
            resolve(response.data);
            // dispatch here
            // dispatch()
        }).catch(error => {
            reject(error);
            console.log("Error checking if book is rented")
        })
    });

    // recommend trends
    const getRecommended = (): Promise<any> => new Promise((resolve, reject) =>{
        httpClient.get(`/Book/GetTrends`)
        .then((response) =>{
            // Books successFully trended
            resolve(response);
        })
        .catch(error =>{
            reject(error);
            console.log("Error getting trends");
        })
    });

    // Get the quantity of this book available
    const getQuantity = (bookId:string): Promise<any> => new Promise((resolve, reject) => {
        httpClient.get(`/Book/GetBookQuantity?bookId=${bookId}`)
        .then((response) =>{
            // book quantity
            resolve(response.data)
            // dispatch();
        })
        .catch(error => {
            reject(error)
            console.log("Error getting book quantity");
        })
    })


    const getAllBooks = (): Promise<any> => new Promise((resolve, reject) =>{
        httpClient.get(`Book/GetAll?MaxResultCount=150`)
        .then((response) => {
            resolve(response.data.result.items);
            // dispatch
            const payload:IBook[] = response.data.result.items;
            dispatch(getAllBooksAction(payload))
        })
        .catch(error =>{
            reject(error);
            console.log("Error getting all books")
        })
    })

    return (
        <BookStateContext.Provider value={{ ...state }}>
            <BookActionContext.Provider 
                value={{ getBookByISBN, 
                        rentBook,
                        getQuantity, 
                        isBookRented,
                        getRecommended,
                        getAllBooks }}> 
                  {children}
                </BookActionContext.Provider>
        </BookStateContext.Provider>
    )
}



const useActionsContext = () => {
    const context = useContext(BookActionContext);
  
    if (context == undefined) {
    //   throw new Error("Book context must be used within the book provider");
      console.log("Book context must be used within the book provider");
    }

    return context;
  };

  export default BookProvider;