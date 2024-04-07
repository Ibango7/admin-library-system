import React from 'react';
import { Card } from 'antd'; // Import Card component from Ant Design
import { IBook } from './self-organizing-class/Node';
import styles from './styles/book.style.module.scss';

interface BookProps {
  book: IBook;
  onClick: (book: IBook) => void;
}

const Book: React.FC<BookProps> = ({ book, onClick }) => {
  const handleBookClick = () => {
    onClick(book);
  };

  return (

    <Card
      className="book"
      onClick={handleBookClick}
      hoverable
      style={{ width: 200, marginBottom: 20 }} // Adjust the width and margin as needed
    >
      <div className={styles.info}>
        <h3 className="test">{book.title}</h3>
        <p >{book.author}</p>
        <p>Access Frequency: {book.accessFrequency}</p>
      </div>
    </Card>
  );
};

export default Book;
