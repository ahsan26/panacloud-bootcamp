import {
  SET_UN_ANSWERED_QUESTIONS,
  SET_ANSWERED_QUESTIONS,
  SET_QUESTIONS
} from "../../constants";

export const setUnAnsweredQuestions = unAnsweredQuestions => dispatch => {
  dispatch({
    type: SET_UN_ANSWERED_QUESTIONS,
    unAnsweredQuestions
  });
};

export const setAnsweredQuestions = answeredQuestions => dispatch => {
  dispatch({
    type: SET_ANSWERED_QUESTIONS,
    answeredQuestions
  });
};

export const setQuestions = questions => dispatch => {
  dispatch({
    type: SET_QUESTIONS,
    questions
  });
};
