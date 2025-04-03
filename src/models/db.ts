import Dexie, { Table } from 'dexie';
import { IBook } from './Book';

export class BookDB extends Dexie {
  bookList!: Table<IBook, number>;

  constructor() {
    super('BookDB');
    this.version(2).stores({
      bookList: '++id,alastname,title,[sname+snumber]'
    });
    this.version(3)
      .stores({
        bookList: '++id,alastname,title, status'
      })
      .upgrade((tx) => {
        // An upgrade function for version 3 will upgrade data based on version 2.
        return tx
          .table('bookList')
          .toCollection()
          .modify((book) => {
            // Modify each friend:
            if (book.read) {
              book.status = 'read';
            } else {
              book.status = book.have ? 'have' : 'want';
            }
            delete book.read;
            delete book.have;
            delete book.tags;
            delete book.series;
          });
      });
  }
}

export const db = new BookDB();
