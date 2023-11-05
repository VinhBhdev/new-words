import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import WordAction from '../../redux/actions/WordAction';
import _ from 'lodash';

function VocabDeleteModal() {
    const { isOpenDeleteModal, deleteVocab, deleteVocabErrorMessage, isDeletingVocab, isDeletedVocab } = useSelector(state => state.wordReducer.words);
    const dispatch = useDispatch();

    const handleCloseDeleteModal = () => {
        dispatch(WordAction.setIsOpenDeleteModal(false, null));
    }

    const handleDeleteVocab = () => {
        if (isDeletingVocab) {
            return;
        }
        dispatch(WordAction.handleDeleteVocab(deleteVocab.id))
    }

    const buttonClass = isDeletingVocab ? 'loading-button' : ''
    if (!deleteVocab) {
        return <></>
    }
    return (
        <>
            <Modal show={isOpenDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete vocab</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Word</Form.Label>
                            <Form.Control
                                value={deleteVocab?.word}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Meaning</Form.Label>
                            <Form.Control
                                value={deleteVocab?.meaning}
                                disabled
                            />
                        </Form.Group>
                        <Form.Text style={{ color: 'red' }}>{deleteVocabErrorMessage}</Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Close
                    </Button>
                    <Button className={buttonClass} variant="danger" onClick={handleDeleteVocab} style={{ minWidth: '80px' }} >
                        {
                            isDeletingVocab
                                ? <Spinner animation="border" variant="light" size='sm' />
                                : 'Delete'
                        }
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default VocabDeleteModal;