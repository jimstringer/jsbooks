import { useNavigate } from 'react-router';
import { IBook } from '../models/Book';
import { db } from '../models/db';

export const BookCard = ({ book }: { book: IBook }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col bg-gray-100 p-1 rounded-lg shadow-md'>
      <div className='flex flex-row justify-between'></div>
      <div className='flex justify-start content-center text-lg rounded-md px-2 py-1 my-0.5'>
        <span className='text-gray-400 '>Title:</span>
        <div className='font-medium text-gray-800 px-2'>{book.title}</div>
      </div>
      <div className='flex justify-start content-center text-lg rounded-md px-2 py-1 my-0.5'>
        <span className='text-gray-400'>Author:</span>
        <div className='text-gray-600 px-2'>
          {book.alastname}, {book.afirstnames}
        </div>
      </div>
      <div className='flex justify-start content-center text-lg rounded-md px-2 py-1 my-0.5'>
        <span className='text-gray-400'>Comment:</span>
        <div className='text-gray-600 px-2'>{book.comment}</div>
      </div>
      <div className='flex justify-start content-center text-lg rounded-md px-2 py-1 my-0.5'>
        <span className='text-gray-400 '>Status:</span>
        <div className='text-gray-600 px-2'>{book.status}</div>
      </div>
      <div className='flex flex-row justify-center'>
        <button
          className='bg-blue-500 text-white w-32 rounded-lg mt-2 mr-2'
          onClick={() => navigate(`/book/edit/${book.id}`)}
        >
          Edit
        </button>
        <button
          className='bg-red-500 text-white w-32 rounded-lg mt-2'
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
