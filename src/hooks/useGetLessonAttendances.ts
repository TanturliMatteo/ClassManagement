import { useQuery } from "@tanstack/react-query";
import { getAttendancesByLesson } from "../services/attendancesServices";

export const useGetLessonAttendances = (lessonId: string) => {
  return useQuery({
    queryKey: ["attendances", lessonId],
    queryFn: () => getAttendancesByLesson(lessonId),
    enabled: !!lessonId,
  });
};
