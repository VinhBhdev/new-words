class PracticeServiceClass {
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    getRandPracticeWord(unsubmittedWordList) {
        const randIdx = this.getRndInteger(0, unsubmittedWordList.length);
        return {
            randIdx,
            randWord: unsubmittedWordList[randIdx]
        };
    }
}

const PracticeService = new PracticeServiceClass;
export default PracticeService

