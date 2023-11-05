import _ from "lodash";
import WordService from "../../services/WordService";
import WordConstant from "../constants/WordConstant";
import { ToastContainer, toast } from 'react-toastify';
class WordActionClass {
    getAllWord() {
        return async (dispatch) => {
            try {
                dispatch({
                    type: WordConstant.GET_ALL_WORDS
                })
                const response = await WordService.getAllNewWords();
                if (response.data) {
                    const wordList = response.data;
                    dispatch(this.getVocabListSuccess(wordList))
                } else {
                    dispatch(this.getVocalListFailed(response))
                }
            } catch (error) {
                dispatch(this.getVocalListFailed(error))
            }
        }
    }

    getVocabListSuccess(wordList) {
        return {
            type: WordConstant.GET_VOCAB_LIST_SUCCESS,
            wordList,
        }
    }

    getVocalListFailed(error) {
        return {
            type: WordConstant.GET_VOCAB_LIST_FAILED,
            error,
        }
    }

    getVocabList(page, pageSize) {
        return async (dispatch) => {
            try {
                dispatch({
                    type: WordConstant.GET_ALL_WORDS
                })
                const response = await WordService.getVocabList(page, pageSize);
                if (response.data) {
                    const wordList = response.data.data;
                    dispatch(this.getVocabListSuccess(wordList))
                } else {
                    dispatch(this.getVocalListFailed(response))
                }
            } catch (error) {
                dispatch(this.getVocalListFailed(error))
            }
        }
    }

    saveCurrentPage(page) {
        return {
            type: WordConstant.SAVE_CURRENT_PAGE,
            page
        }
    }

    setIsOpenEditModal(open, editingVocab = null) {
        return {
            type: WordConstant.SET_IS_OPEN_EDIT_MODAL,
            isOpenEditModal: open,
            editingVocab,
        }
    }

    handleUpdateVocab(newVocab) {
        return async (dispatch, getState) => {
            dispatch({
                type: WordConstant.UPDATE_VOCAB,
                newVocab,
            })
            try {
                const response = await WordService.updateVocab(newVocab);
                if (response && response.data) {
                    const result = response.data;
                    dispatch(this.handleUpdateVocabSuccess(result));
                    dispatch(this.setIsOpenEditModal(false, null));
                    const { page, pageSize } = _.cloneDeep(getState().wordReducer.words);
                    dispatch(this.getVocabList(page, pageSize));
                } else {
                    dispatch(this.handleUpdateVocabFailed(response));
                }
            } catch (error) {
                console.log(">>. er", error)
                dispatch(this.handleUpdateVocabFailed(error));
            }

        }
    }

    handleUpdateVocabSuccess(result) {
        toast.success(
            "Update vocab successfully!",
            {
                position: toast.POSITION.TOP_RIGHT,
                className: 'wrapper-messages messages-success',
            },
        );

        return {
            type: WordConstant.UPDATE_VOCAB_SUCCESS,
            result,
        }
    }

    handleUpdateVocabFailed(error) {
        return {
            type: WordConstant.UPDATE_VOCAB_FAILED,
            updateVocabErrorMessage: error?.response?.data?.detail || "Update vocab failed!",
        }
    }

    setUpdateVocabErrorMessage(updateVocabErrorMessage) {
        return {
            type: WordConstant.SET_UPDATE_VOCAB_ERROR_MESSAGE,
            updateVocabErrorMessage,
        }
    }

    setIsOpenDeleteModal(isOpenDeleteModal, deleteVocab) {
        return {
            type: WordConstant.SET_IS_OPEN_DELETE_MODAL,
            isOpenDeleteModal,
            deleteVocab,
            deleteVocabErrorMessage: null,
        }
    }

    handleDeleteVocab(deleteVocabId) {
        return async (dispatch, getState) => {
            dispatch({
                type: WordConstant.DELETE_VOCAB,
                deleteVocabId
            });
            try {
                const response = await WordService.deleteVocab(deleteVocabId);
                if (response && response.data) {
                    dispatch(this.handleDeleteVocabSuccess(response.data));
                    dispatch(this.setIsOpenDeleteModal(false, null));
                    const { page, pageSize } = _.cloneDeep(getState().wordReducer.words);
                    dispatch(this.getVocabList(page, pageSize));
                } else {
                    dispatch(this.handleDeleteVocabFailed(response));
                }
            } catch (error) {
                dispatch(this.handleDeleteVocabFailed(error));
            }
        }
    }

    handleDeleteVocabSuccess(result) {
        toast.success(
            "Delete vocab successfully!",
            {
                position: toast.POSITION.TOP_RIGHT,
                className: 'wrapper-messages messages-success',
            },
        );
        return {
            type: WordConstant.DELETE_VOCAB_SUCCESS,
            result,
        }
    }

    handleDeleteVocabFailed(error) {
        return {
            type: WordConstant.DELETE_VOCAB_FAILED,
            deleteVocabErrorMessage: error?.response?.data?.detail || "Delete vocab failed!",
        }
    }
}

const WordAction = new WordActionClass;
export default WordAction;