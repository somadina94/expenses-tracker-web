export interface Notification {
  _id?: string;
  title: string;
  body: string;
  read: boolean;
  createdAt?: Date;
}
