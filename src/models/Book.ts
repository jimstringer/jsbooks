// should have array of authors
export enum BookStatus {
  HAVE = 'have',
  READ = 'read',
  WANT = 'want',
  READING = 'reading'
}

export enum BookSeries {
  SINGLE = 'single',
  DUOLOGY = 'duology',
  TRILOGY = 'trilogy',
  STATIC = 'static',
  DYNAMIC = 'dynamic',
  ANTHOLOGY = 'anthology'
}


export interface IBook {
  id?: number;
  title: string;
  series: BookSeries;
  sname: string;
  snumber: number;
  afirstnames: string;
  alastname: string;
  rating: number;
  comment: string;
  status: BookStatus;
}
