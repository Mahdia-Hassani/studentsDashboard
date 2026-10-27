// Student Data

const students = [
  { id: 1, name: "Ali", course: "JavaScript", score: 85 },
  { id: 2, name: "Mahdia", course: "Web Development", score: 92 },
  { id: 3, name: "Yasamin", course: "HTML and CSS", score: 45 },
  { id: 4, name: "Omid", course: "Python", score: 67 },
  { id: 5, name: "Zahra", course: "JavaScript", score: 38 },
];

// Select HTML Elements

const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const courseName = document.getElementById("courseName");
const studentScore = document.getElementById("studentScore");

const studentTableBody = document.getElementById("studentTableBody");

const totalStudents = document.getElementById("totalStudents");
const passedStudents = document.getElementById("passedStudents");
const failedStudents = document.getElementById("failedStudents");
const averageScore = document.getElementById("averageScore");

const recordCount = document.getElementById("recordCount");
const formMessage = document.getElementById("formMessage");

// Display Students

function displayStudents() {
  studentTableBody.innerHTML = "";

  students.forEach(function (student) {
    // Object Destructuring
    const { id, name, course, score } = student;

    let result = "";

    if (score >= 50) {
      result = "Passed";
    } else {
      result = "Failed";
    }

    const row = document.createElement("tr");

    // Display student information
    const idCell = document.createElement("td");
    idCell.textContent = "#" + id;
    idCell.className = "student-id";

    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    nameCell.className = "student-name";

    const courseCell = document.createElement("td");
    courseCell.textContent = course;

    const scoreCell = document.createElement("td");
    scoreCell.textContent = score;
    scoreCell.className = "score-value";

    const resultCell = document.createElement("td");
    const resultLabel = document.createElement("span");

    resultLabel.textContent = result;
    resultLabel.className = "result " + result.toLowerCase();

    resultCell.appendChild(resultLabel);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(courseCell);
    row.appendChild(scoreCell);
    row.appendChild(resultCell);

    studentTableBody.appendChild(row);
  });
}

// Update Dashboard Summary

function updateSummary() {
  totalStudents.textContent = students.length;

  const passed = students.filter(function (student) {
    return student.score >= 50;
  });

  passedStudents.textContent = passed.length;

  const failed = students.filter(function (student) {
    return student.score < 50;
  });

  failedStudents.textContent = failed.length;

  const totalScore = students.reduce(function (total, student) {
    return total + student.score;
  }, 0);

  let average = 0;

  if (students.length > 0) {
    average = totalScore / students.length;
  }

  averageScore.textContent = average.toFixed(1);

  recordCount.textContent =
    students.length + (students.length === 1 ? " student" : " students");
}

// Validate Student Information

function validateStudent(name, course, score) {
  if (name.trim() === "") {
    return "Please enter the student name.";
  }

  if (course.trim() === "") {
    return "Please enter the course name.";
  }

  if (score.trim() === "" || !Number.isFinite(Number(score))) {
    return "Please enter a valid score.";
  }

  const numericScore = Number(score);

  if (numericScore < 0 || numericScore > 100) {
    return "Score must be between 0 and 100.";
  }

  return "";
}

// Add New Student

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = studentName.value.trim();
  const course = courseName.value.trim();
  const score = studentScore.value;

  const errorMessage = validateStudent(name, course, score);

  if (errorMessage !== "") {
    formMessage.textContent = errorMessage;
    formMessage.className = "error";

    formMessage.classList.add("form-message");

    return;
  }

  const newStudent = {
    id:
      students.length > 0
        ? Math.max(
            ...students.map(function (student) {
              return student.id;
            }),
          ) + 1
        : 1,

    name: name,
    course: course,
    score: Number(score),
  };

  students.push(newStudent);

  displayStudents();
  updateSummary();

  formMessage.textContent = "Student added successfully!";
  formMessage.className = "form-message success";

  studentForm.reset();
});

// Spread Syntax Demonstration

const originalStudent = students[0];

const updatedStudent = {
  ...originalStudent,
  score: 95,
};

console.log("Original Student:", originalStudent);
console.log("Updated Student:", updatedStudent);

displayStudents();
updateSummary();
