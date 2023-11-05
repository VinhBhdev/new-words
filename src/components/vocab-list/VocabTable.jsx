import { Table, Form } from 'react-bootstrap';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import WordAction from '../../redux/actions/WordAction';
function VocabTable() {
    const { wordList, isLoading, page, pageSize, numberOfPage } = useSelector(state => state.wordReducer.words);
    const dispatch = useDispatch();
    const handleOpenEditModal = (editingVocab) => {
        dispatch(WordAction.setIsOpenEditModal(true, editingVocab));
    }

    const handleOpenDeleteModal = (deleteVocab) => {
        dispatch(WordAction.setIsOpenDeleteModal(true, deleteVocab));
    }

    const getTableAction = (vocab) => {
        return (
            <>
                <span className='table-action-icon' onClick={() => handleOpenEditModal(vocab)}> <AiOutlineEdit className='table-action-edit' /> </span>
                <span className='table-action-icon' onClick={() => handleOpenDeleteModal(vocab)}> <AiOutlineDelete className='table-action-delete' /> </span>
                <span className='table-action-icon'> <AiOutlineEye className='table-action-view' /></span>
            </>
        )
    }
    return (
        <Table striped bordered hover className='vocab-table'>
            <thead>
                <tr>
                    <th className='vocab-table-id'>#</th>
                    <th className='vocab-table-word'>Word
                        <Form.Control
                            className='search-header'
                        /></th>
                    <th className='vocab-table-meaning'>Meaning
                        <Form.Control
                            className='search-header'
                        />
                    </th>
                    <th className='vocab-table-action'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    wordList && wordList.length > 0 && wordList.map((vocab, index) => {
                        return (
                            <tr>
                                <td className='vocab-table-id'>{(page - 1) * pageSize + index + 1}</td>
                                <td className='vocab-table-word'>{vocab.word}</td>
                                <td className='vocab-table-meaning'>{vocab.meaning}</td>
                                <td className='vocab-table-action'>{getTableAction(vocab)}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table>
    );
}

export default VocabTable;