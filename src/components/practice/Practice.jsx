import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import WordAction from '../../redux/actions/WordAction.js';
import PracticeAction from '../../redux/actions/PracticeAction.js';
import PracticeConstant from '../../redux/constants/PracticeConstant.js';
import { AiOutlineSwap } from "react-icons/ai";
import Loading from '../Loading.jsx';

function Practice() {
    const dispatch = useDispatch();
    const { wordList, isLoading } = useSelector(state => state.wordReducer.words);
    const {
        practiceType,
        answerStatus,
        practiceWord,
        unsubmittedWordList,
        isSubmitting,
        isSubmitted,
    } = useSelector(state => state.practiceReducer.practice);
    const [firstLanguage, setFirstLanguage] = useState("");
    const [secondLanguage, setSecondLanguage] = useState("");

    useEffect(() => {
        if (practiceType === PracticeConstant.PRACTICE_TYPE_ENG_TO_VIE) {
            setFirstLanguage("English");
            setSecondLanguage("Vietnamese");
        } else {
            setFirstLanguage("Vietnamese");
            setSecondLanguage("English");
        }
    }, [practiceType])

    const [answer, setAnswer] = useState("");
    useEffect(() => {
        dispatch(WordAction.getAllWord());
    }, [])

    const handleStartPracticeOneWord = (unsubmittedWordList) => {
        setAnswer("");
        dispatch(PracticeAction.startPracticeOneWord(unsubmittedWordList));
    }

    useEffect(() => {
        if (!wordList || !wordList.length) {
            return;
        }
        dispatch(PracticeAction.startPracticeSection(wordList));
        handleStartPracticeOneWord(wordList);
    }, [wordList]);

    const handleSubmitAnswer = (event) => {
        event.preventDefault();
        if (answer) {
            dispatch(PracticeAction.submitAnswer(practiceWord, answer));
        }
    }

    const handleChangeValue = (event) => {
        setAnswer(event.target.value)
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if (isSubmitted) handleStartPracticeOneWord(unsubmittedWordList);
        else handleSubmitAnswer(event)
    }

    // getCompareSolutionTemplate = () => {}
    const getDangerAlert = () => {
        return (
            <Alert dismissible variant="danger" style={{ marginTop: '30px' }}>
                <Alert.Heading>Correct solution:</Alert.Heading>
                <p>{practiceWord.meaning}</p>
            </Alert>
        )
    }

    const getSuccessAlert = () => {
        return (
            <Alert dismissible variant="success" style={{ marginTop: '30px' }}>
                <Alert.Heading>You are correct!</Alert.Heading>
                <p>Go ahead.</p>
            </Alert>
        )
    }

    const getResultTemplate = () => {
        if (isSubmitted) {
            if (answerStatus === PracticeConstant.ANSWER_STATUS_CORRECT) {
                return getSuccessAlert();
            } else if (answerStatus === PracticeConstant.ANSWER_STATUS_INCORRECT) {
                return getDangerAlert();
            }

        }
    }

    const getSubmitAnswerButton = () => {
        let content;
        if (isSubmitting) {
            content = (
                <Spinner animation="border" variant="light" size='sm' />
            )
        }
        else if (!isSubmitted) {
            content = 'Submit';
        }
        else {
            return null;
        }
        return (
            <Button type='submit' as="a" variant="success" onClick={handleSubmitAnswer} style={{ display: 'inline-block', float: 'right', minWidth: '80px', backgroundColor: '#16a34a' }}>
                {content}
            </Button>
        )
    }

    const getNextPracticeWordButton = () => {
        return isSubmitted
            ? (
                <Button type='submit' as="a" variant="outline-primary" onClick={handleSubmitForm} style={{ display: 'block', float: 'right', overflow: 'hidden' }}>
                    Next
                </Button>
            ) : null
    }

    const getPracticeTemplate = () => {
        return isLoading || !practiceWord
            ? <div><Loading /></div>
            : (
                <div style={{ minWidth: '360px', marginTop: '50px' }}>
                    <Form onSubmit={handleSubmitForm} >
                        <Form.Group className="mb-3">
                            <h3 style={{ textAlign: 'center', color: '#0369a1', margin: '20px', }}>{practiceWord?.word}</h3>
                            <Form.Control size='lg' type="text" placeholder="Meaning..." value={answer} onChange={handleChangeValue} />
                        </Form.Group>
                        <div style={{ overflow: 'hidden' }}>
                            {getSubmitAnswerButton()}
                            {getNextPracticeWordButton()}
                        </div>
                    </Form>
                    {getResultTemplate()}

                </div >
            )
    }

    const handleSwapLanguage = () => {
        const newType = practiceType === PracticeConstant.PRACTICE_TYPE_ENG_TO_VIE
            ? PracticeConstant.PRACTICE_TYPE_VIE_TO_ENG
            : PracticeConstant.PRACTICE_TYPE_ENG_TO_VIE
        dispatch(PracticeAction.changePracticeType(unsubmittedWordList, practiceWord, newType))
    }

    const getPracticeTypeTemplate = () => {
        const languageTemplate = (language) => {
            return (
                <Badge bg="light" text="dark" style={{ width: '120px', fontWeight: 500 }}>
                    {language}
                </Badge>
            )
        }
        return (
            <h5 style={{ textAlign: 'right' }}>
                {languageTemplate(firstLanguage)}
                <AiOutlineSwap onClick={handleSwapLanguage} style={{ cursor: 'pointer', color: 'blue', margin: 'auto 8px' }} />
                {languageTemplate(secondLanguage)}
            </h5>
        )
    }
    return (
        <div className="container" style={{ margin: '30px auto' }}>
            <div>
                {getPracticeTypeTemplate()}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {getPracticeTemplate()}
            </div>
        </div>
    );
}

export default Practice;