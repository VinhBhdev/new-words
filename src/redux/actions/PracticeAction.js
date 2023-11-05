import PracticeService from "../../services/PracticeService";
import PracticeConstant from "../constants/PracticeConstant";
import _ from 'lodash'
import { toLowerCaseNonAccentVietnamese } from "../../utils/nonAccentVietnamese";

class PracticeActionClass {
    startPracticeSection(wordList) {
        return {
            type: PracticeConstant.START_PRACTICE_SECTION,
            unsubmittedWordList: wordList,
        }
    }
    startPracticeOneWord(unsubmittedWordList) {
        const getRandWordData = PracticeService.getRandPracticeWord(unsubmittedWordList);
        const { randIdx, randWord } = getRandWordData;
        const unsubmittedData = _.cloneDeep(unsubmittedWordList);
        unsubmittedData.splice(randIdx, 1);

        return {
            type: PracticeConstant.START_PRACTICE_ONE_WORD,
            unsubmittedWordList: unsubmittedData,
            practiceWord: randWord,
        }
    }

    submitAnswer(practiceWord, answer) {
        return async (dispatch) => {
            dispatch({
                type: PracticeConstant.SUBMIT_ANSWER,
            })
            const isCorrectAnswer = toLowerCaseNonAccentVietnamese(practiceWord.meaning).trim() === toLowerCaseNonAccentVietnamese(answer).trim();
            dispatch({
                type: PracticeConstant.SUBMIT_ANSWER_SUCCESS,
                answerStatus: isCorrectAnswer ? PracticeConstant.ANSWER_STATUS_CORRECT : PracticeConstant.ANSWER_STATUS_INCORRECT,
            })
        }
    }

    changePracticeType(unsubmittedWordList, practiceWord, practiceType) {
        let unsubmitted = unsubmittedWordList.map(item => {
            return {
                ...item,
                word: item.meaning,
                meaning: item.word,
            }
        })
        let practiceWordData = {
            ...practiceWord,
            word: practiceWord.meaning,
            meaning: practiceWord.word,
        }
        return {
            type: PracticeConstant.CHANGE_PRACTICE_TYPE,
            practiceType,
            unsubmittedWordList: unsubmitted,
            practiceWord: practiceWordData
        }
    }
}

const PracticeAction = new PracticeActionClass;
export default PracticeAction;