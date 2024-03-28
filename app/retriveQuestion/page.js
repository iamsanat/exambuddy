'use client'
import React, { useState, useEffect } from 'react';
import './Student.css'; // Import CSS file for styling
import jsPDF from 'jspdf';


const Student = () => {
    const [criteria, setCriteria] = useState({
        year: '',
        branch: '',
        examType: '',
        marks: '',
        subject: ''
    });
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchClicked, setFetchClicked] = useState(false); // State to track if fetch button is clicked
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);

    const handleCheckboxChange = (event, question) => {
        const { checked } = event.target;
        if (checked) {
            setSelectedQuestions(prevSelected => [...prevSelected, question]);
            setTotalMarks(prevMarks => prevMarks + parseInt(question.marks));
        } else {
            setSelectedQuestions(prevSelected => prevSelected.filter(q => q !== question));
            setTotalMarks(prevMarks => prevMarks - parseInt(question.marks));
        }
    };

    const printSelectedQuestionsToPDF = () => {
        const pdf = new jsPDF();
    let yPos = 50; // Initial Y position for the first question

    selectedQuestions.forEach((question, index) => {
        let questionLine = `Q${index + 1}. ${question.questionText} Marks: ${question.marks} Type: ${question.type}`;
        
        // Add space between question marks and type
        questionLine = questionLine.replace(/Marks: (\d+)/, '               Marks: $1                '); // Add space after marks
        questionLine = questionLine.replace(/Type: (\w+)/, 'Type: $1'); // Add space after type
        
        pdf.text(10, yPos, questionLine);

        // Adjust the Y position for the next question
        yPos += 10; // Increase the Y position for the next question
    });

    pdf.save('selected_questions.pdf');
    };

    useEffect(() => {
        if (fetchClicked) {
            fetchQuestions();
            setFetchClicked(false); // Reset fetchClicked state after fetching questions
        }
    }, [fetchClicked, fetchQuestions]);

    const fetchQuestions = () => {
        setLoading(true);
        fetch(process.env.NEXT_PUBLIC_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    let filteredQuestions = Object.values(data);

                    // Filtering based on criteria
                    if (criteria.year) {
                        filteredQuestions = filteredQuestions.filter(question => question.year === criteria.year);
                    }
                    if (criteria.branch) {
                        filteredQuestions = filteredQuestions.filter(question => question.branch === criteria.branch);
                    }
                    if (criteria.examType) {
                        filteredQuestions = filteredQuestions.filter(question => question.examType === criteria.examType);
                    }
                    if (criteria.marks) {
                        filteredQuestions = filteredQuestions.filter(question => question.marks === criteria.marks);
                    }
                    if (criteria.subject) {
                        filteredQuestions = filteredQuestions.filter(question => question.subject === criteria.subject);
                    }

                    setQuestions(filteredQuestions);
                } else {
                    setQuestions([]);
                }
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setCriteria(prevCriteria => ({
            ...prevCriteria,
            [name]: value
        }));
    };

    const handleFetchClick = () => {
        setFetchClicked(true); // Set fetchClicked state to true to trigger fetching questions
    };

    return (
        <div className="student-container">
            <h1>Get Questions</h1>
            <form>
                <div className="criteria-selection">
                    <label>
                        Year:
                        <select name="year" value={criteria.year} onChange={handleChange}>
                            <option value="">Select Year</option>
                            <option value="FY">FY</option>
                            <option value="SY">SY</option>
                            <option value="TY">TY</option>
                            <option value="FFY">FFY</option>
                        </select>
                    </label>
                    <label>
                        Branch:
                        <select name="branch" value={criteria.branch} onChange={handleChange}>
                            <option value="">Select Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="CSF">CSF</option>
                            <option value="AIDS">AIDS</option>
                            <option value="CSBS">CSBS</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                        </select>
                    </label>
                    <label>
                        Exam Type:
                        <select name="examType" value={criteria.examType} onChange={handleChange}>
                            <option value="">Select Exam Type</option>
                            <option value="Endterm">Endterm</option>
                            <option value="Midterm">Midterm</option>
                        </select>
                    </label>
                    <label>
                        Marks:
                        <select name="marks" value={criteria.marks} onChange={handleChange}>
                            <option value="">Select Marks</option>
                            <option value="5">5</option>
                            <option value="3">3</option>
                        </select>
                    </label>
                    <label>
                        Subject:
                        <select name="subject" value={criteria.subject} onChange={handleChange}>
                            <option value="">Select Subject</option>
                            <option value="ADS">ADS</option>
                            <option value="CBS">CBS</option>
                            <option value="ICS">ICS</option>
                            <option value="DBMS">DBMS</option>
                            <option value="OS">OS</option>
                        </select>
                    </label>
                    {/* Button to fetch questions */}
                    <button type="button" onClick={handleFetchClick}>Fetch Questions</button>
                </div>
            </form>
            <div className="question-container">
            <div className="marks-counter">
                <p>Total Marks: {totalMarks}</p>
            </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {questions.length === 0 && Object.values(criteria).some(value => value !== '') ? (
                            <p>No questions match the selected criteria.</p>
                        ) : (
                            <div>
                                <h2>Questions</h2>
                                <ul>
                                    {questions.map((question, index) => (
                                        <li key={index}>
                                        {/* Add a checkbox for each question */}
                                        <input type="checkbox" id={`question-${index}`} onChange={(e) => handleCheckboxChange(e, question)} />
                                        <label htmlFor={`question-${index}`}>
                                            {/* Render question details */}
                                            <p>Branch: {question.branch}</p>
                                            <p>Exam Type: {question.examType}</p>
                                            <p>Marks: {question.marks}</p>
                                            <p>Question Text: {question.questionText}</p>
                                            <p>Subject: {question.subject}</p>
                                            <p>Year: {question.year}</p>
                                        </label>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <button 
        type="button" 
        onClick={printSelectedQuestionsToPDF} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
        Print Selected Questions to PDF
        </button>        
        </div>
    );
};

export default Student;
