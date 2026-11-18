
import { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Arun Kumar",
      rollNo: "101",
      department: "Computer Science",
      year: "II Year",
      email: "arun@gmail.com",
      address: "Salem, Tamil Nadu",
      bloodGroup: "O+",
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 2,
      name: "Priya",
      rollNo: "102",
      department: "Information Technology",
      year: "II Year",
      email: "priya@gmail.com",
      address: "Chennai, Tamil Nadu",
      bloodGroup: "B+",
      image: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: 3,
      name: "Rahul",
      rollNo: "103",
      department: "Electronics",
      year: "III Year",
      email: "rahul@gmail.com",
      address: "Coimbatore, Tamil Nadu",
      bloodGroup: "A+",
      image: "https://i.pravatar.cc/150?img=13"
    }
  ]);

  const [search, setSearch] = useState("");

  // Add Student
  function addStudent(newStudent) {
    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent
    ]);
  }

  // Delete Student
  function deleteStudent(id) {
    setStudents((previousStudents) =>
      previousStudents.filter(
        (student) => student.id !== id
      )
    );
  }

  // Edit Student Details
  function updateStudent(id, updatedDetails) {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id
          ? { ...student, ...updatedDetails }
          : student
      )
    );
  }

  // Change Profile Picture
  function updateStudentImage(id, newImage) {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id
          ? { ...student, image: newImage }
          : student
      )
    );
  }

  // Search Students
  const filteredStudents = students.filter((student) => {
    const searchValue = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.rollNo.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="app">

      {/* Header */}
      <header className="dashboard-header">
        <h1>Student Card System</h1>
        <p>Student Information Management System</p>
      </header>

      <main className="dashboard-content">

        {/* Add Student */}
        <StudentForm onAddStudent={addStudent} />

        {/* Student Details */}
        <section className="student-section">

          <h2>Student Details</h2>

          {/* Search */}
          <input
            className="search-input"
            type="text"
            placeholder="Search by student name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Student Count */}
          <p className="student-count">
            Total Students: {students.length}
          </p>

          {/* Student Cards */}
          {filteredStudents.length > 0 ? (
            <StudentList
  students={filteredStudents}
  onDelete={deleteStudent}
  onImageChange={updateStudentImage}
  onUpdateStudent={updateStudent}
/>
          ) : (
            <div className="no-students">
              <h3>No Students Found</h3>
              <p>
                Try searching with another name or roll number.
              </p>
            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Student Card System | Built with React.js</p>
      </footer>

    </div>
  );
}

export default App;
