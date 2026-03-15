# AI Resume Analyzer

A web application that analyzes a user's resume against a given job description using AI.  
The system extracts information from the uploaded resume, evaluates how well it matches the job requirements, and provides insights to help users improve their chances of getting shortlisted.

The application also generates interview questions, suggests relevant skills to learn, and provides a structured day-wise preparation roadmap for the candidate.

---

## Live Demo

https://project-resume-analyzer.vercel.app

---

## Features

- Upload resume in PDF format
- Automatic resume parsing and data extraction
- AI analysis based on job description
- Resume–Job Description match scoring
- Skill improvement suggestions
- AI-generated technical interview questions
- AI-generated behavioral interview questions
- Day-wise preparation roadmap based on job requirements
- Generate a new AI-optimized resume based on the job description
- Download generated resume as PDF
- Authentication and protected routes
- Responsive UI

---

## Tech Stack

### Frontend
- React.js
- TailwindCSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB

### Other Tools
- Multer (file upload)
- AI API integration
- PDF parsing libraries
- JWT / cookie based authentication

---

## Application Workflow

1. User opens the frontend application.
2. User logs in or registers.
3. User provides a job description.
4. User uploads their resume (PDF).
5. Frontend sends the resume and job description to the backend.
6. Backend parses the resume and extracts relevant information.
7. Extracted data is analyzed by AI along with the provided job description.
8. AI processes both inputs and generates insights.
9. Frontend displays the analysis results which include:

   - Resume match score with the job description (0–100 scale)
   - Relevant tech stack / skills the user should improve
   - Possible technical interview questions
   - Possible behavioral interview questions
   - Day-wise preparation plan to help the candidate prepare for the role

10. The system also generates an AI-optimized resume tailored to the job description.
11. User can download the generated resume as a PDF.

---

## Screenshots

### User Register & Login
![Register UI](/screenshots/Register.png)

![Login UI](/screenshots/Login.png)

### Home Page
![Home Page UI](/screenshots/Home%20Page.png)

### Dashboard Pages
![Report UI](/screenshots/Report%20Dashboard.png)

![Preparation Plan UI](/screenshots/Preparaton%20Plan.png)
