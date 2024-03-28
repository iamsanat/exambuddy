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

        if (fetchClicked) {
            fetchQuestions();
            setFetchClicked(false); // Reset fetchClicked state after fetching questions
        }
    }, [fetchClicked, criteria]);

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
            {/* Your form and other JSX code */}
        </div>
    );
};

export default Student;
