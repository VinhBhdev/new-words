import { Spinner } from 'react-bootstrap';
export default function Loading() {
    return (
        <div className='justify-content-center'>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}