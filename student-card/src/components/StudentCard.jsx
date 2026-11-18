
import { useState, useRef } from "react";

function StudentCard({
  student,
  onDelete,
  onImageChange,
  onUpdateStudent
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...student });
  const fileInputRef = useRef(null);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setEditData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  // Save updated student details
  function handleSave() {
    if (!editData.name.trim() || !editData.rollNo.trim()) {
      alert("Name and Roll Number are required!");
      return;
    }

    onUpdateStudent(student.id, editData);
    setIsEditing(false);
  }

  // Cancel editing
  function handleCancel() {
    setEditData({ ...student });
    setIsEditing(false);
  }

  // Upload profile picture
  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be below 5MB.");
        e.target.value = "";
        return;
      }

      const imageUrl = URL.createObjectURL(file);

      setEditData((previous) => ({
        ...previous,
        image: imageUrl
      }));

      if (!isEditing && onImageChange) {
        onImageChange(student.id, imageUrl);
      }
    }
  }

  // Reusable input field
  function renderInput(label, name) {
    return (
      <div className="edit-field" key={name}>
        <label>{label}</label>
        <input
          type="text"
          name={name}
          value={editData[name] || ""}
          onChange={handleChange}
          placeholder={`Enter ${label}`}
        />
      </div>
    );
  }

  return (
    <div className="student-card">

      {/* Profile Header */}
      <div className="card-header">

        <div className="profile-image-wrapper">
          <img
            src={
              isEditing
                ? editData.image || "https://placehold.co/150x150?text=Student"
                : student.image || "https://placehold.co/150x150?text=Student"
            }
            alt={student.name}
            className="student-image"
          />

          <button
            type="button"
            className="change-photo-btn"
            onClick={() => fileInputRef.current.click()}
          >
            Change Photo
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <span className="student-status">Active</span>
      </div>

      {/* Student Name */}
      {isEditing ? (
        <input
          className="edit-name-input"
          type="text"
          name="name"
          value={editData.name}
          onChange={handleChange}
          placeholder="Student Name"
        />
      ) : (
        <h2>{student.name}</h2>
      )}

      {/* Department */}
      {isEditing ? (
        renderInput("Department", "department")
      ) : (
        <p className="department">{student.department}</p>
      )}

      {/* Student Details */}
      <div className="student-details">

        {isEditing ? (
          <>
            {renderInput("Roll No", "rollNo")}
            {renderInput("Year", "year")}
            {renderInput("Email", "email")}
            {renderInput("Address", "address")}
            {renderInput("Blood Group", "bloodGroup")}
          </>
        ) : (
          <>
            <p><strong>Roll No:</strong> {student.rollNo}</p>
            <p><strong>Year:</strong> {student.year}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
          </>
        )}

      </div>

      {/* Action Buttons */}
      {isEditing ? (
        <div className="edit-actions">

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

          <button
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>

        </div>
      ) : (
        <div className="card-actions">

          <button
            className="edit-btn"
            onClick={() => {
              setEditData({ ...student });
              setIsEditing(true);
            }}
          >
            Edit Profile
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(student.id)}
          >
            Delete Student
          </button>

        </div>
      )}

    </div>
  );
}

export default StudentCard;
