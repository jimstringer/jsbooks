import Dexie, { Table } from 'dexie';
import { IBook } from './Book';

export class BookDB extends Dexie {
  bookList!: Table<IBook, number>;

  constructor() {
    super('BookDB');
    this.version(1).stores({
      bookList: '++id,alastname,title,[sname+snumber]'
    });
  }
}

export const db = new BookDB();
