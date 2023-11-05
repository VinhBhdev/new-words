import React, { useEffect } from 'react'
import VocabTable from './vocab-list/VocabTable';
import '../styles/home.css'
import { useDispatch, useSelector } from 'react-redux';
import WordAction from '../redux/actions/WordAction';
import VocabPagination from './vocab-list/VocabPagination';
import VocabEditModal from './vocab-list/VocabEditModal';
import Loading from './Loading';
import VocabDeleteModal from './vocab-list/VocabDeleteModal';
function Home() {
    const dispatch = useDispatch();
    const { wordList, isLoading, page, pageSize, numberOfPage } = useSelector(state => state.wordReducer.words);
    useEffect(() => {
        dispatch(WordAction.getVocabList(page, pageSize));
    }, [page]);

    const handleSeveCurrentPage = (pageNumber) => {
        dispatch(WordAction.saveCurrentPage(pageNumber));
    }

    const getHomeTemplate = () => {
        return isLoading
            ? <Loading />
            : (
                <>
                    <VocabTable wordList={wordList} />
                    <div className='justify-content-center mt-8'>
                        <VocabPagination handleSeveCurrentPage={handleSeveCurrentPage} />
                    </div>
                    <VocabEditModal />
                    <VocabDeleteModal />
                </>
            )
    }

    return (
        <div className="home-container">
            {getHomeTemplate()}
        </div>
    );
}

export default Home;