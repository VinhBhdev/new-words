import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from 'react-redux';

function VocabPagination({ handleSeveCurrentPage }) {
    const { wordList, isLoading, page, pageSize, totalPages } = useSelector(state => state.wordReducer.words);
    const paginationTemplateSmall = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page} onClick={() => handleSeveCurrentPage(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return (
            <div>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    {items}
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        )
    }

    const paginationTemplateLarge = () => {
        return (
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        )
    }
    return (
        <>
            {paginationTemplateSmall()}
        </>
    );
}

export default VocabPagination