
import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    year: "",
    email: "",
    address: "",
    bloodGroup: "",
    image: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be below 2 MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previous) => ({
        ...previous,
        image: reader.result
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const requiredFields = [
      "name",
      "rollNo",
      "department",
      "year",
      "email",
      "address",
      "bloodGroup"
    ];

    const isInvalid = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (isInvalid) {
      alert("Please fill all student details");
      return;
    }

    onAddStudent({
      ...formData,
      id: Date.now()
    });

    setFormData({
      name: "",
      rollNo: "",
      department: "",
      year: "",
      email: "",
      address: "",
      bloodGroup: "",
      image: ""
    });
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <label>Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {formData.image && (
        <div className="image-preview">
          <img src={formData.image} alt="Profile Preview" />
          <p>Profile Preview</p>
        </div>
      )}

      <label>Student Name</label>
      <input
        name="name"
        placeholder="Enter student name"
        value={formData.name}
        onChange={handleChange}
      />

      <label>Roll Number</label>
      <input
        name="rollNo"
        placeholder="Enter roll number"
        value={formData.rollNo}
        onChange={handleChange}
      />

      <label>Department</label>
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Electronics">Electronics</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Civil">Civil</option>
      </select>

      <label>Academic Year</label>
      <select
        name="year"
        value={formData.year}
        onChange={handleChange}
      >
        <option value="">Select Year</option>
        <option value="I Year">I Year</option>
        <option value="II Year">II Year</option>
        <option value="III Year">III Year</option>
        <option value="IV Year">IV Year</option>
      </select>

      <label>Email Address</label>
      <input
        name="email"
        type="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Address</label>
      <textarea
        name="address"
        placeholder="Enter student address"
        value={formData.address}
        onChange={handleChange}
        rows="3"
      />

      <label>Blood Group</label>
      <select
        name="bloodGroup"
        value={formData.bloodGroup}
        onChange={handleChange}
      >
        <option value="">Select Blood Group</option>
        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
          (group) => (
            <option key={group} value={group}>
              {group}
            </option>
          )
        )}
      </select>

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
