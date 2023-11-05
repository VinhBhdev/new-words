import PracticeConstant from "../../constants/PracticeConstant";
const initialState = {
    practiceType: PracticeConstant.PRACTICE_TYPE_ENG_TO_VIE,
    answerStatus: PracticeConstant.ANSWER_STATUS_NOT_ANSWER,
    practiceWord: null,
    unsubmittedWordList: [],
    isSubmitting: false,
    isSubmitted: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PracticeConstant.START_PRACTICE_SECTION: {
            return {
                ...state,
                unsubmittedWordList: action.unsubmittedWordList,
            }
        }
        case PracticeConstant.START_PRACTICE_ONE_WORD: {
            return {
                ...state,
                answerStatus: PracticeConstant.ANSWER_STATUS_NOT_ANSWER,
                unsubmittedWordList: action.unsubmittedWordList,
                practiceWord: action.practiceWord,
                isSubmitting: false,
                isSubmitted: false,
            }
        }
        case PracticeConstant.SUBMIT_ANSWER: {
            return {
                ...state,
                isSubmitting: true,
                isSubmitted: false,
            }
        }
        case PracticeConstant.SUBMIT_ANSWER_SUCCESS: {
            return {
                ...state,
                isSubmitted: true,
                isSubmitting: false,
                answerStatus: action.answerStatus,
            }
        }
        case PracticeConstant.CHANGE_PRACTICE_TYPE: {
            return {
                ...state,
                practiceType: action.practiceType,
                unsubmittedWordList: action.unsubmittedWordList,
                practiceWord: action.practiceWord
            }
        }
        default:
            return state;
    }
}
