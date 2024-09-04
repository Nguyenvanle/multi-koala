import BasicCard from "@/features/users/components/organisms/basic-card";

export default function TeacherProfile({
  params,
}: {
  params: { teacherId: string };
}) {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      <div className="flex flex-1 ">
        <BasicCard />
      </div>

      <div className="flex flex-1 ">2</div>
    </div>
  );
}
