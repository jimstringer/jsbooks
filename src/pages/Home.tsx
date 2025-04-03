import { db } from '../models/db';
import { IBook } from '../models/Book';
import { BookCard } from './BookCard';
//import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

export const Home = () => {
  const books = useLiveQuery(
    () => db.bookList.where('status').equals('want').sortBy('alastname'),
    [],
    []
  );

  /*
  const [bookslist, setBookslist] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const blist = await db.bookList
        .orderBy('alastname')
        .filter((book: IBook) => book.have === false)
        .toArray();
      setBookslist(blist);
    };
    fetchBooks();
  }, []);
*/
  return (
    <>
      <p>Books Needed</p>
      <div className='grid grid-cols-1 md:grid-cols-4 bg-white p-2 gap-4 rounded-lg shadow-xl w-full text-center border border-gray-200'>
        {books.map((book: IBook) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};
