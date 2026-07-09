export interface Student {
  id: string;
  created_at: string;
  name: string;
  email: string;
  class_id: string | null;
  enrollment_date: string;
  end_date: string | null;
  payment: boolean;
}

export interface StudentWithForeign extends Student {
  Classes: {
    name: string;
  };
}

export interface Attendances {
  lesson_id: string;
  student_id: string;
  is_present: boolean;
}

export interface Class {
  id: string;
  created_at: string;
  name: string;
  level: string;
  details: string | null;
  teacher_id: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface ClassWithTeacher extends Class {
  Teachers: { name: string };
}

export interface Lesson {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  date: string;
  class_id: string;
  teacher_id: string;
}

export interface LessonWithForeign extends Lesson {
  Classes: {
    name: string;
  };
  Teachers: {
    name: string;
  };
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
}
