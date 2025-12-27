export interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  reminder: Date;
  userId?: string;
}
