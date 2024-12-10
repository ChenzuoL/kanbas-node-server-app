import Database from "../Database/index.js";

// Initialize answers in the database
Database.answers = Database.answers || {};
Database.attempts = Database.attempts || {};

// Get remaining attempts for a specific quiz and user
export function getRemainingAttempts(quizId, userId) {
    if (!Database.attempts[quizId] || !Database.attempts[quizId][userId]) {
        return null; // Return null if no record of attempts
    }
    return Database.attempts[quizId][userId].remainingAttempts;
}

// Set initial remaining attempts for a user and quiz
export function setInitialRemainingAttempts(quizId, userId, totalAttempts) {
    if (!Database.attempts[quizId]) {
        Database.attempts[quizId] = {};
    }

    if (!Database.attempts[quizId][userId]) {
        Database.attempts[quizId][userId] = { remainingAttempts: totalAttempts };
    }

    console.log(
        `Initialized remaining attempts for quiz ${quizId}, user ${userId}: ${totalAttempts}`
    );
    return Database.attempts[quizId][userId];
}

// Update remaining attempts for a specific quiz and user
export function updateRemainingAttempts(quizId, userId, totalAttempts = 3) {
    if (!Database.attempts[quizId]) {
        Database.attempts[quizId] = {};
    }

    if (!Database.attempts[quizId][userId]) {
        // Initialize attempts if not found
        console.log(`Initializing attempts for quiz ${quizId}, user ${userId}`);
        Database.attempts[quizId][userId] = { remainingAttempts: totalAttempts };
    }

    const userAttempts = Database.attempts[quizId][userId];

    if (userAttempts.remainingAttempts > 0) {
        userAttempts.remainingAttempts -= 1; // Decrement attempts
    } else {
        throw new Error(`No remaining attempts left for quiz ${quizId}, user ${userId}`);
    }

    console.log(
        `Updated remaining attempts for quiz ${quizId}, user ${userId}: ${userAttempts.remainingAttempts}`
    );
    return userAttempts;
}



// Get user answers for a specific quiz
export function getUserAnswers(quizId, userId) {
    const { answers } = Database;
    if (!answers[quizId] || !answers[quizId][userId]) {
        return { answers: {}, timestamp: null }; // Return empty answers if not found
    }

    return answers[quizId][userId];
}

// Save user answers for a specific quiz
export function saveUserAnswers(quizId, userId, userAnswers) {
    const { answers } = Database;

    // Initialize nested structure if it doesn't exist
    if (!answers[quizId]) {
        answers[quizId] = {};
    }

    answers[quizId][userId] = {
        answers: userAnswers,
        timestamp: new Date().toISOString(),
    };

    console.log(`Saved answers for quiz ${quizId}, user ${userId}:`, answers[quizId][userId]); // Debugging log
    return answers[quizId][userId];
}

