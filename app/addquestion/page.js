"use client"
import React, { useState } from 'react';
// import './Teachers.css'; // Import CSS file for styling
function Teachers() {
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [examType, setExamType] = useState('');
  const [marks, setMarks] = useState('');
  const [subject, setSubject] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const url = process.env.NEXT_PUBLIC_URL

      const questionData = {
        year,
        branch,
        examType,
        marks,
        subject,
        questionText
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionData)
      });

      if (!response.ok) {
        throw new Error('Failed to add question.');
      }

      // Reset form fields after successful submission
      setYear('');
      setBranch('');
      setExamType('');
      setMarks('');
      setSubject('');
      setQuestionText('');

      // Show success message
      setSuccessMessage('Question added successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding question:', error.message);
      // Show error message
      setSuccessMessage('');
      setErrorMessage('Failed to add question. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
  <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Teacher's Page - Add Question</h2>
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {/* Year selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
          <option value="">Select Year</option>
          <option value="FY">FY</option>
          <option value="SY">SY</option>
          <option value="TY">TY</option>
          <option value="FFY">FFY</option>
        </select>
      </div>
      {/* Branch selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Branch:</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
          <option value="">Select Branch</option>
          <option value="CSF">CSF</option>
          <option value="AIDS">AIDS</option>
          <option value="CSBS">CSBS</option>
          <option value="CSE">CSE</option>
        </select>
      </div>
      {/* Exam type selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Exam Type:</label>
        <select value={examType} onChange={(e) => setExamType(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
          <option value="">Select Exam Type</option>
          <option value="Endterm">Endterm</option>
          <option value="Midterm">Midterm</option>
        </select>
      </div>
      {/* Marks selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Marks:</label>
        <select value={marks} onChange={(e) => setMarks(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
          <option value="">Select Marks</option>
          <option value="5">5 Marks</option>
          <option value="3">3 Marks</option>
        </select>
      </div>
      {/* Subject selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
          <option value="">Select Subject</option>
          <option value="ADS">ADS</option>
          <option value="CBS">CBS</option>
          <option value="ICS">ICS</option>
          <option value="AIML">AIML</option>
        </select>
      </div>
      {/* Question text */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block' }}>Question:</label>
        <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}></textarea>
      </div>
      {/* Submit button */}
      <button type="submit" style={{ backgroundColor: '#3490dc', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Add Question</button>
    </form>
    {/* Success and error messages */}
    {successMessage && <div style={{ color: '#10b981' }}>{successMessage}</div>}
    {errorMessage && <div style={{ color: '#ef4444' }}>{errorMessage}</div>}
  </div>
</div>


  );
}

export default Teachers;





