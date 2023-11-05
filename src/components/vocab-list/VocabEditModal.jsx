import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import WordAction from '../../redux/actions/WordAction';
import _ from 'lodash';

function VocabEditModal() {
    const { isOpenEditModal, editingVocab, isUpdatedVocab, isUpdatingVocab, updateVocabErrorMessage } = useSelector(state => state.wordReducer.words);
    const [newVocab, setNewVocab] = useState(null);
    const code = {
        editWordCode: 'edit_word_code',
        editMeaningCode: 'edit_meaning_code',
    }
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingVocab) {
            setNewVocab(_.cloneDeep(editingVocab))
        }
    }, [editingVocab])

    const handleCloseEditModal = () => {
        dispatch(WordAction.setIsOpenEditModal(false, null));
        handleClearUpdateError();
    }

    const handleClearUpdateError = () => {
        if (updateVocabErrorMessage) {
            dispatch(WordAction.setUpdateVocabErrorMessage(null));
        }
    }
    const handleChangeNewVocab = (event, editCode) => {
        const newVocabData = _.cloneDeep(newVocab);
        const value = event.target.value;
        if (editCode === code.editWordCode) {
            newVocabData.word = value;
        } else if (editCode === code.editMeaningCode) {
            newVocabData.meaning = value;
        }
        setNewVocab(newVocabData);
        handleClearUpdateError();
    }

    const handleEditVocab = () => {
        if (isUpdatingVocab) {
            return;
        }
        dispatch(WordAction.handleUpdateVocab(newVocab))
    }
    const buttonClass = isUpdatingVocab ? 'loading-button' : ''
    if (!editingVocab || !newVocab) {
        return <></>
    }
    return (
        <>
            <Modal show={isOpenEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit vocab</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Word</Form.Label>
                            <Form.Control
                                value={newVocab?.word}
                                onChange={(event) => handleChangeNewVocab(event, code.editWordCode)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Meaning</Form.Label>
                            <Form.Control
                                onChange={(event) => handleChangeNewVocab(event, code.editMeaningCode)}
                                value={newVocab?.meaning}
                            />
                        </Form.Group>
                        <Form.Text variant="danger" style={{ color: 'red' }}>{updateVocabErrorMessage}</Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button className={buttonClass} variant="primary" onClick={handleEditVocab} style={{ minWidth: '120px' }} >
                        {
                            isUpdatingVocab
                                ? <Spinner animation="border" variant="light" size='sm' />
                                : 'Save Changes'
                        }
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default VocabEditModal;