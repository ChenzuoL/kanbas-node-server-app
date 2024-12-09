export default [
    {
        "_id": "QST123",
        "quizId": "QZ123",
        "type": "multiple-choice",
        "title": "Sample Question",
        "points": 10,
        "question": "What is 2 + 2?",
        "choices": [
            { "text": "3", "correct": false },
            { "text": "4", "correct": true },
            { "text": "5", "correct": false }
        ],
        "answers": ["4"], // For fill-in-the-blank or multiple answers
        "correct": false  // For true-false
    }
];