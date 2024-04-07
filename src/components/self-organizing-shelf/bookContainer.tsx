'use client';
import React, { useState, useEffect } from "react";
import styles from './styles/book.style.module.scss';
import RearrangeNodes from "./self-organizing-class/RearrangeNodes";
import Book from "./book";
import Node from "./self-organizing-class/Node";
import { IBook } from "./self-organizing-class/Node";
import ShelfRowContainer from "../shelf-row/shelfRow";

interface Props {
  books: IBook[];
}


const books: any = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", accessFrequency: 0 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", accessFrequency: 0 },
    { id: 3, title: "1984", author: "George Orwell", accessFrequency: 0 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", accessFrequency: 0 },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", accessFrequency: 0 },
    { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", accessFrequency: 0 },
    { id: 7, title: "To the Lighthouse", author: "Virginia Woolf", accessFrequency: 0 },
    { id: 8, title: "The Lord of the Rings", author: "J.R.R. Tolkien", accessFrequency: 0 },
    { id: 9, title: "Brave New World", author: "Aldous Huxley", accessFrequency: 0 },
    { id: 10, title: "Frankenstein", author: "Mary Shelley", accessFrequency: 0 },
    // Add more books as needed
  ];
  
const BookContainer: React.FC = () => {
const [head, setHead] = useState<Node | null>(null);
const [fqr, setFqr] = useState<boolean>(false);

  // initialize linked list with books when component mounts
  useEffect(() => {
    const headNode = initializeLinkedList(books);
    setHead(headNode);
  }, []);

  // Function to initialize the linked list with mock book data
  const initializeLinkedList = (books: IBook[]): Node | null => {
    let prevNode: Node | null = null;
    let headNode: Node | null = null;
    books.forEach((book) => {
      const node = new Node(book);
      if (!headNode) {
        headNode = node;
      }
      if (prevNode) {
        prevNode.next = node;
        node.prev = prevNode;
      }
      prevNode = node;
    });
    return headNode;
  };

  // Function to handle book click events
  const handleBookClick = (book: IBook): void => {
    let currentNode: Node | null = head;

    while (currentNode) {
      if (currentNode.book && currentNode.book.id === book.id) {
        // check if my current node has previous node and its access frequency is lower
        ++currentNode.frequencyAccess;
        // Update the accessFrequency of the book object within the currentNode
        currentNode.book.accessFrequency = currentNode.frequencyAccess;
        setFqr(!fqr);
        if (currentNode.prev && currentNode.frequencyAccess > currentNode.prev.frequencyAccess) {
          // increment frequency and rearrange nodes
          // ++currentNode.frequencyAccess;
          const newHead = RearrangeNodes(head, currentNode);
          setHead(newHead);
        }

        break;
      }
      currentNode = currentNode.next;
    }
  };

  // this function render the books based on the linked list nodes
  const renderBooks = (headNode: Node | null): JSX.Element[] => {
    const booksToRender: JSX.Element[] = [];
    let currentNode: Node | null = headNode;
    while (currentNode) {
      if (currentNode.book) {
        booksToRender.push(<Book key={currentNode.book.id} book = {currentNode.book} onClick={handleBookClick} />);
      }
      currentNode = currentNode.next;
    }

    return booksToRender;
  }

  return (
    <div className={styles.bookscontainer}>
    <ShelfRowContainer>
        {head && renderBooks(head)}
    </ShelfRowContainer>
    
    </div>
  );
};

export default BookContainer;
