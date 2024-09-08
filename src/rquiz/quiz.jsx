/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from "axios"
import './quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [Loading, setLoading] = useState(true)

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
            setQuestions(response.data.results);
            console.log("data", response.data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchQuestions();
    }, []);
 

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        setShowNextButton(true);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer('');
        setShowNextButton(false);
    };

   
   
    


    return (
        Loading?<p>Loading...</p>:
        <div className="quiz-container">
            <div className="question-box">
                <p className="question-number">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <p> {questions[currentQuestionIndex].question}</p>
               
                <ul className="answers-list">
                {
                    [...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer]
                    .sort()
                    .map((answer, index) => (
                        <li
                        key={index}
                        className={`answer-item ${
                            selectedAnswer === answer
                            ? answer === questions[currentQuestionIndex].correct_answer
                                ? 'correct'
                                : 'incorrect'
                            : selectedAnswer && answer === questions[currentQuestionIndex].correct_answer
                            ? 'correct'
                            : ''
                        }`}
                        onClick={() => {
                            handleAnswerClick(answer);

                            // Automatically show correct answer if an incorrect one is clicked
                            if (answer !== questions[currentQuestionIndex].correct_answer) {
                            setSelectedAnswer(answer);  // Trigger UI update
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    ))
                }
</ul>


                
            </div>
            {showNextButton && (
                <button className="next-button" onClick={handleNextQuestion}>
                    Next Question
                </button>
            )}
        </div>
      
    );
};

export default Quiz;
