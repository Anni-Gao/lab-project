export interface User {
  username?: string;
  password?: string;
  level?: string;
}

export interface Teacher {
  teachername?: string;
  password?: string;
  level?: string;
}
export interface Course {
  coursename?: string;
  teachername?: string;
  hours?: number;
}

export interface Lab {
  labname?: string;
  introduction?: string;
  numbers?: number;
}

export interface Reservation {
  user?: User;
  lab?: Lab;
  course?: Course;
  week?: number;
  day?: number;
}
