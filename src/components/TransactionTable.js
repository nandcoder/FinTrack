import Table from 'react-bootstrap/Table';
import data from '../assets/TransactionData';

function StripedRowExample() {


    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr>
                        <td>{row.name}</td>
                        <td>{row.date}</td>
                        <td>{row.category}</td>
                        <td>{row.status}</td>
                        <td>{row.amount}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default StripedRowExample;