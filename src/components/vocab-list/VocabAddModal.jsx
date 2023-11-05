import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import WordAction from '../../redux/actions/WordAction';
import _ from 'lodash';

function VocabAddModal() {
    const { isOpenAddModal, createVocabErrorMessage, isCreatingVocab, isCreatedVocab, pageSize } = useSelector(state => state.wordReducer.words);
    const dispatch = useDispatch();
    const [clickedAdd, setClickedAdd] = useState(false);

    const code = {
        addWordCode: 'add_word_code',
        addMeaningCode: 'add_meaning_code',
    }

    const [createVocab, setCreateVocab] = useState({});

    const resetCreateVocab = () => {
        setCreateVocab({})
    }

    const handleClearAddError = () => {
        dispatch(WordAction.setCreateVocabErrorMessage(null));
    }
    const handleChangeCreateVocab = (event, addCode) => {
        const createVocabData = _.cloneDeep(createVocab);
        const value = event.target.value;
        if (addCode === code.addWordCode) {
            createVocabData.word = value;
        } else if (addCode === code.addMeaningCode) {
            createVocabData.meaning = value;
        }
        setCreateVocab(createVocabData);
        handleClearAddError();
    }

    const handleCloseAddModal = () => {
        dispatch(WordAction.setIsOpenAddModal(false));
        if (clickedAdd && isCreatedVocab) {
            dispatch(WordAction.getVocabList(1, pageSize))
        }
    }

    const handleAddVocab = () => {
        setClickedAdd(true);
        dispatch(WordAction.handleCreateVocab(createVocab));
        resetCreateVocab();
    }

    const buttonClass = isCreatingVocab ? 'loading-button' : ''
    return (
        <>
            <Modal show={isOpenAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add vocab</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Word</Form.Label>
                            <Form.Control
                                value={createVocab?.word || ""}
                                onChange={event => handleChangeCreateVocab(event, code.addWordCode)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Meaning</Form.Label>
                            <Form.Control
                                value={createVocab?.meaning || ""}
                                onChange={event => handleChangeCreateVocab(event, code.addMeaningCode)}
                            />
                        </Form.Group>
                        <Form.Text style={{ color: 'red' }}>{createVocabErrorMessage}</Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Close
                    </Button>
                    <Button className={buttonClass} variant="success" onClick={handleAddVocab} style={{ minWidth: '80px' }} >
                        {
                            isCreatingVocab
                                ? <Spinner animation="border" variant="light" size='sm' />
                                : 'Add'
                        }
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default VocabAddModal;