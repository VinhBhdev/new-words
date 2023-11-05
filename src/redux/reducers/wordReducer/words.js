import WordConstant from "../../constants/WordConstant";
const initialState = {
    wordList: [],
    isLoading: false,
    isUpdatingVocab: false,
    isUpdatedVocab: false,
    isDeletingVocab: false,
    isDeletedVocab: false,
    updateVocabErrorMessage: null,
    deleteVocabErrorMessage: null,
    isOpenEditModal: false,
    editingVocab: null,
    isOpenDeleteModal: false,
    deleteVocab: null,
    error: null,
    page: 1,
    pageSize: 10,
    numberOfPage: 5,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case WordConstant.GET_ALL_WORDS: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case WordConstant.GET_VOCAB_LIST_SUCCESS: {
            return {
                ...state,
                wordList: action.wordList,
                isLoading: false,
            }
        }
        case WordConstant.GET_VOCAB_LIST_FAILED: {
            return {
                ...state,
                error: action.error,
                isLoading: false,
            }
        }
        case WordConstant.SAVE_CURRENT_PAGE: {
            return {
                ...state,
                page: action.page,
            }
        }
        case WordConstant.SET_IS_OPEN_EDIT_MODAL: {
            return {
                ...state,
                isOpenEditModal: action.isOpenEditModal,
                editingVocab: action.editingVocab,
            }
        }
        case WordConstant.UPDATE_VOCAB: {
            return {
                ...state,
                isUpdatedVocab: false,
                isUpdatingVocab: true,
            }
        }
        case WordConstant.UPDATE_VOCAB_SUCCESS: {
            return {
                ...state,
                isUpdatedVocab: true,
                isUpdatingVocab: false,
                updateVocabErrorMessage: null,
            }
        }
        case WordConstant.UPDATE_VOCAB_FAILED: {
            return {
                ...state,
                isUpdatedVocab: true,
                isUpdatingVocab: false,
                updateVocabErrorMessage: action.updateVocabErrorMessage
            }
        }
        case WordConstant.SET_UPDATE_VOCAB_ERROR_MESSAGE: {
            return {
                ...state,
                updateVocabErrorMessage: action.updateVocabErrorMessage
            }
        }
        case WordConstant.UPDATE_VOCAB: {
            return {
                ...state,
                isUpdatedVocab: false,
                isUpdatingVocab: true,
            }
        }
        case WordConstant.UPDATE_VOCAB_SUCCESS: {
            return {
                ...state,
                isUpdatedVocab: true,
                isUpdatingVocab: false,
                updateVocabErrorMessage: null,
            }
        }
        case WordConstant.UPDATE_VOCAB_FAILED: {
            return {
                ...state,
                isUpdatedVocab: true,
                isUpdatingVocab: false,
                updateVocabErrorMessage: action.updateVocabErrorMessage
            }
        }

        case WordConstant.SET_IS_OPEN_DELETE_MODAL: {
            return {
                ...state,
                isOpenDeleteModal: action.isOpenDeleteModal,
                deleteVocab: action.deleteVocab,
                deleteVocabErrorMessage: null,
            }
        }

        case WordConstant.DELETE_VOCAB: {
            return {
                ...state,
                isDeletedVocab: false,
                isDeletingVocab: true,
            }
        }
        case WordConstant.DELETE_VOCAB_SUCCESS: {
            return {
                ...state,
                isDeletedVocab: true,
                isDeletingVocab: false,
                deleteVocabErrorMessage: null,
            }
        }
        case WordConstant.DELETE_VOCAB_FAILED: {
            return {
                ...state,
                isDeletedVocab: true,
                isDeletingVocab: false,
                deleteVocabErrorMessage: action.deleteVocabErrorMessage
            }
        }
        case WordConstant.SET_DELETE_VOCAB_ERROR_MESSAGE:
            return {
                ...state,
                deleteVocabErrorMessage: action.deleteVocabErrorMessage
            }
        default:
            return state;
    }
}
