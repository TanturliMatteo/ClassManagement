import { useQuery } from "@tanstack/react-query";
import { getAttendancesByLesson } from "../services/attendancesServices";

export const useGetLessonAttendances = (lessonId: string) => {
  return useQuery({
    queryKey: ["attendances", lessonId],
    queryFn: () => getAttendancesByLesson(lessonId),
    enabled: !!lessonId, // Gira la query solo se l'ID della lezione è valido
  });
};
