import { WebPushToken } from "./web-push-token";

export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: Date;
  expoPushToken?: string[];
  country: string;
  currency: string;
  webPushToken?: WebPushToken[];
}
