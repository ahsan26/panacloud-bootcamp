import {
  SET_UN_ANSWERED_QUESTIONS,
  SET_ANSWERED_QUESTIONS,
  SET_QUESTIONS
} from "../../constants";

export default (
  state = { unAnsweredQuestions: [], answeredQuestions: [], questions: {} },
  action
) => {
  switch (action.type) {
    case SET_UN_ANSWERED_QUESTIONS:
      state = { ...state, unAnsweredQuestions: action.unAnsweredQuestions };
      return state;
    case SET_ANSWERED_QUESTIONS:
      state = { ...state, answeredQuestions: action.answeredQuestions };
      return state;
    case SET_QUESTIONS:
      state = { ...state, questions: action.questions };
      return state;
    default:
      return state;
  }
};
