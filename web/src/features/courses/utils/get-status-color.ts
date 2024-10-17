import { COURSE_VERIFY, CourseStatusType } from "@/types/course/verify";

type getStatusColorRes =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "edit"
  | "pending"
  | null
  | undefined;

export const statusLabels = {
  APPROVED: "Approved",
  PENDING_APPROVAL: "Pending Approval",
  REJECTED: "Rejected",
  IN_EDITING: "In Editing",
};

export const getStatusColor = (status: CourseStatusType): getStatusColorRes => {
  switch (status) {
    case COURSE_VERIFY.Values.APPROVED:
      return "default";
    case COURSE_VERIFY.Values.IN_EDITING:
      return "edit";
    case COURSE_VERIFY.Values.PENDING_APPROVAL:
      return "pending";
    case COURSE_VERIFY.Values.REJECTED:
      return "destructive";
  }
};
