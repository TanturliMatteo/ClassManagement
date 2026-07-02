export interface Student {
  id: string;
  created_at: string | null;
  name: string | null;
  email: string | null;
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
  created_at: string | null;
  name: string | null;
  level: string | null;
  details: string | null;
  teacher_id: string | null;
}

export interface ClassWithTeacher extends Class {
  Teachers: { name: string } | null;
}

export interface Lesson {
  id: string;
  created_at: string | null;
  title: string | null;
  description: string | null;
  date: string | null;
  class_id: string | null;
  teacher_id: string | null;
}

export interface LessonWithForeign extends Lesson {
  Classes: {
    name: string;
  } | null;
  Teachers: {
    name: string;
  } | null;
}

export interface Teacher {
  id: string;
  name: string | null;
  email: string | null;
}
