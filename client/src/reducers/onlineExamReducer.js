import {
  GET_QUESTIONS_ONLINE,
  CLEAR_ONLINE_EXAM,
  POST_FINAL_SUBMIT
} from "../actions/types";

const initialState = {
  questions: null,
  studentoptions: null,
  correctoptions: null,
  paperIndex: null,
  examId: null,
  examname: null,
  mid: null,
  result: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS_ONLINE:
      return {
        ...state,
        questions: action.payload.questions,
        paperIndex: action.payload.paperIndex,
        examId: action.payload.examId,
        examname: action.payload.examname,
        mid: action.payload.mid
      };
    case POST_FINAL_SUBMIT:
      return {
        ...state,
        result: action.payload
      };
    case CLEAR_ONLINE_EXAM:
      return {
        questions: null,
        studentoptions: null,
        correctoptions: null,
        paperIndex: null,
        examId: null,
        examname: null,
        mid: null
      };
    default:
      return state;
  }
}
