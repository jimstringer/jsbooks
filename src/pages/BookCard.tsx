import { useNavigate } from 'react-router';
import { IBook } from '../models/Book';
import { db } from '../models/db';

export const BookCard = ({ book }: { book: IBook }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col bg-gray-100 p-2 rounded-lg shadow-md'>
      <div className='flex flex-row justify-between'>
        <p
          className={`text-lg ${book.have ? 'text-green-500' : 'text-pink-500'}`}
        >
          {book.have ? 'Have' : 'Need'}
        </p>
        <p className={`${book.read ? 'text-green-500' : 'text-pink-500'}`}>
          {book.read ? 'Read' : 'Not-Read'}
        </p>
      </div>
      <h2 className='text-lg font-semibold text-gray-800'>{book.title}</h2>
      <p className='text-gray-600'>{book.alastname}, {book.afirstnames}</p>
      <p className='text-gray-600'>Comment: {book.comment}</p>
      <div className='flex flex-row content-center justify-center'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2'
          onClick={() => navigate(`/book/edit/${book.id}`)}
        >
          Edit
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded-lg mt-2'
          onClick={async () => {
            // Logic to delete the book
            if (book.id !== undefined) {
              await db.bookList.delete(book.id);
            } else {
              console.error('Book ID is undefined, cannot delete.');
            }
            console.log('Book deleted with id:', book.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
