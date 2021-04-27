import { Photo } from "./photo";

export interface User {
  id : number;
  userName : string;
  KnowAs : string;
  age : number;
  gender : string;
  created : Date;
  lastActive : Date;
  photoUrl : string;
  city : string;
  country : string;
  interests?:  string;
  introduction?: string;
  lookingfor?: string;
  photos: Photo[];
}

