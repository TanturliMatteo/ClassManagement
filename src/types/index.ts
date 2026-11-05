export interface Student {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  class_id: string | null;
  enrollment_date: string | null;
  end_date: string | null;
  payment: boolean | null;
  birth_date: string | null;
}

export interface StudentWithForeign extends Student {
  Classes: {
    name: string;
  };
}

export interface Attendances {
  lesson_id: string;
  student_id: string;
  is_present: boolean | null;
}

export interface Class {
  id: string;
  created_at: string;
  name: string | null;
  level: string | null;
  details: string | null;
  teacher_id: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean | null;
  num_student: string | null;
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
  class_id: string | null;
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
  name: string | null;
  email: string | null;
}
