import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';
import { IBook } from '../models/Book';
import { BookCard } from './BookCard';

export const BooksList = () => {
  const books = useLiveQuery(() => db.bookList.toArray(), [], []);
  return (
    <div>
      <h1>Book List</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 bg-white p-2 gap-4 rounded-lg shadow-xl w-full text-center border border-gray-200'>
        {books?.map((book: IBook) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
};
