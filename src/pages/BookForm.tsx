import { SetStateAction, useEffect, useState } from 'react';
//import { IBook } from '../models/Book';
import { db } from '../models/db';
import { Rating } from '../components/Rating';
import { useNavigate } from 'react-router';
import { BookSeries, BookStatus } from '../models/Book';
import { useParams } from 'react-router';

export const BookForm = () => {
  const [rating, setRating] = useState(0);
  const [snumber, setSnumber] = useState(0);
  const [seriesSelected, setSelectedSeries] = useState('');
  const [statusSelected, setSelectedStatus] = useState('');
  const [formLabel, setFormLabel] = useState('Add Book');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    comment: '',
    sname: ''
  });

  const { title, author, comment, sname } = formData;

  const navigate = useNavigate();
  //const reset = useReset();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'series') {
      setSelectedSeries(value);
    }
    if (name === 'status') {
      setSelectedStatus(value);
    }
  };
  const bid = useParams().bid;
  useEffect(() => {
    if (bid) {
      setFormLabel('Edit Book');
      db.bookList.get(+bid).then((book) => {
        if (book) {
          setFormData({
            title: book.title,
            author: book.afirstnames + ' ' + book.alastname,
            comment: book.comment,
            sname: book.sname
          });
          setRating(book.rating);
          setSelectedStatus(book.status);
          setSelectedSeries(book.series);
          setSnumber(book.snumber);
        }
      });
    }
  }, [bid]);

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //const formData = new FormData(event.currentTarget);
    const author = formData.author as string;
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
        title: formData.title as string,
        afirstnames: authorFirstName,
        alastname: authorLastName,
        comment: formData.comment as string,
        rating: rating,
        series: seriesSelected as BookSeries,
        sname: formData.sname as string,
        snumber: snumber as number,
        status: statusSelected as BookStatus
      });
      console.log('Book added with id:', id);
      // Optionally, you can reset the form or redirect the user
      //reset();
      navigate('/book/list');
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <div className='bg-gray-100'>
      <h1 className='text-2xl font-bold text-center mt-4'>{formLabel}</h1>
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
              value={statusSelected}
              onChange={handleSelectChange}
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
              value={seriesSelected}
              onChange={handleSelectChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
              value={snumber}
              onChange={(e) => {
                setSnumber(Number(e.target.value));
              }}
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
              value={sname}
              onChange={handleChange}
              type='text'
              placeholder='Series Name'
              className='disabled:text-gray-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className=''>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Title
            </label>
            <input
              name='title'
              value={title}
              onChange={handleChange}
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
              value={author}
              onChange={handleChange}
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
              value={comment}
              onChange={handleChange}
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
              onChange={(e) => {
                setRating(e as SetStateAction<number>);
              }}
              edit={true}
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
