export interface IBook {
  id?: number;
  title: string;
  series: boolean;
  sname: string;
  snumber: number;
  afirstnames: string;
  alastname: string;
  have: boolean;
  read: boolean;
  rating: number;
  tags: string[];
  comment: string;
}
