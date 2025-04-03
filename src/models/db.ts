import Dexie, { Table } from 'dexie';
import { IBook } from './Book';

export class BookDB extends Dexie {
  bookList!: Table<IBook, number>;

  constructor() {
    super('BookDB');

    this.version(3).stores({
      bookList: '++id,alastname,title, status'
    });
  }
}

export const db = new BookDB();
