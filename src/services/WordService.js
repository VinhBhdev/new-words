import ApiService from "./ApiService";
import WordApiConstant from '../constants/api/WordApiConstant'
class WordServiceClass {
    async getAllNewWords() {
        const url = WordApiConstant.GET_ALL_WORD_URL;
        const response = await ApiService.get(url);
        return response;
    }

    async getVocabList(page, pageSize) {
        const url = `${WordApiConstant.GET_VOCAB_LIST_URL}?page=${page}&page_size=${pageSize}`;
        const response = await ApiService.get(url);
        return response;
    }

    async updateVocab(vocab) {
        const url = `${WordApiConstant.UPDATE_VOCAB_URL}${vocab.id}`;
        const updateData = {
            word: vocab.word,
            meaning: vocab.meaning,
        }
        const response = await ApiService.put(url, updateData);
        return response;
    }

    async deleteVocab(vocabId) {
        const url = `${WordApiConstant.DELETE_VOCAB_URL}${vocabId}`;
        const response = await ApiService.delete(url);
        return response;
    }

    async createVocab(vocab) {
        const url = WordApiConstant.CREATE_VOCAB_URL;
        const response = await ApiService.post(url, vocab);
        return response;
    }
}

const WordService = new WordServiceClass;
export default WordService

