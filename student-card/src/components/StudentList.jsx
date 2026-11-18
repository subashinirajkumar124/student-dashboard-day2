import StudentCard from "./StudentCard";

function StudentList({
  students,
  onDelete,
  onImageChange,
  onUpdateStudent
}) {
  return (
    <div className="student-container">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onDelete={onDelete}
          onImageChange={onImageChange}
          onUpdateStudent={onUpdateStudent}
        />
      ))}
    </div>
  );
}

export default StudentList;