export interface Student {
  id: string;
  created_at: string;
  name: string;
  email: string;
  class_id: string | null;
  enrollment_date: string | null;
  end_date: string | null;
}

export interface StudentWithClass extends Student {
  Classes: {
    name: string;
  } | null;
}

export interface Class {
  id: string;
  created_at: string;
  name: string;
  level: string;
  details: string;
  teachers: string;
}

export interface Lesson {
  id: string;
  created_at: string;
  title: string;
  description: string;
  date_ora: string;
  class_id: string;
}
