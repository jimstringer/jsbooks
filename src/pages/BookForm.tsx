import { SetStateAction, useState } from 'react';
//import { IBook } from '../models/Book';
import { db } from '../models/db';
import { Rating } from '../components/Rating';
import { useNavigate } from 'react-router';
//import { useReset } from '../hooks/useReset';
import { BookSeries, BookStatus } from '../models/Book';
//import { useParams } from 'react-router-dom';
//import { useEffect } from 'react';

export const BookForm = () => {
  const [rating, setRating] = useState(0);
  const [series, setSeries] = useState(false);

  const navigate = useNavigate();
  //const reset = useReset();

  const isSeries = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const isChecked = event.target.value === BookSeries.SINGLE ? false : true;
    if (!isChecked) {
      // If the series is single book clear the series name
      const seriesNameInput = document.getElementById(
        'sname'
      ) as HTMLInputElement;
      if (seriesNameInput) {
        seriesNameInput.value = '';
      }
    }
    // Set the series state based on the checkbox
    setSeries(isChecked);
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const author = formData.get('author') as string;
    const authorArray = author.split(' ').map((tag) => tag.trim());
    if (authorArray.length < 2) {
      alert('Please enter both first and last name for the author.');
      return;
    }
    const authorFirstName =
      authorArray.length > 2
        ? authorArray[0] + ' ' + authorArray[1]
        : authorArray[0];
    const authorLastName = authorArray[authorArray.length - 1];

    try {
      const id = await db.bookList.add({
        title: formData.get('title') as string,
        afirstnames: authorFirstName,
        alastname: authorLastName,
        comment: formData.get('comment') as string,
        rating: rating,
        series: formData.get('series') as BookSeries,
        sname: formData.get('sname') as string,
        snumber: formData.get('snumber')
          ? parseInt(formData.get('snumber') as string)
          : 0,
        status: formData.get('status') as BookStatus
      });
      console.log('Book added with id:', id);
      // Optionally, you can reset the form or redirect the user
      //reset();
      navigate('/book/list');
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };
  //onClick={() => setSeries((prev) => !prev)}

  return (
    <div className='bg-gray-100'>
      <form
        className='bg-white shadow-md rounded px-1 md:px-8 pt-6 pb-8 mb-4 '
        onSubmit={formSubmit}
      >
        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div className=''>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Status
            </label>
            <select
              name='status'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value={BookStatus.HAVE}>Have</option>
              <option value={BookStatus.READ}>Read</option>
              <option value={BookStatus.WANT}>Want</option>
              <option value={BookStatus.READING}>Reading</option>
            </select>
          </div>
          <div className=''>
            <label className='px-2 text-sm font-medium text-gray-900 dark:text-white'>
              Series#
            </label>
            <select
              name='series'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={isSeries}
            >
              <option value={BookSeries.SINGLE}>Single</option>
              <option value={BookSeries.DUOLOGY}>Duology</option>
              <option value={BookSeries.TRILOGY}>Trilogy</option>
              <option value={BookSeries.STATIC}>Static</option>
              <option value={BookSeries.DYNAMIC}>Dynamic</option>
              <option value={BookSeries.ANTHOLOGY}>Anthology</option>
            </select>
          </div>
          <div className=''>
            <input
              name='snumber'
              disabled={!series}
              type='number'
              className='w-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className=''>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Series Name
            </label>
            <input
              id='sname'
              name='sname'
              type='text'
              placeholder='Series Name'
              disabled={!series}
              className='disabled:text-gray-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className=''>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Title
            </label>
            <input
              name='title'
              type='text'
              required
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className=''>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Author
            </label>
            <input
              name='author'
              type='text'
              placeholder='Author'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div className=''>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Comment
            </label>
            <input
              name='comment'
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Comment'
            />
          </div>
          <div className=''>
            <Rating
              className='flex '
              size={24}
              count={5}
              value={rating}
              edit={true}
              onChange={(value: SetStateAction<number>) => setRating(value)}
            />
          </div>
          <div className='mb-4'>
            <input
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            />
          </div>
        </div>
      </form>
    </div>
  );
};
