import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import data from '../assets/TransactionData';

function StripedRowExample() {


    return (





        <Table class="table align-middle mb-0 bg-white">


            <thead class="bg-light" >
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>

                {data.map((row) => (
                    <tr>
                        <td><div class="d-flex align-items-center">



                            <div class="ms-3">
                                <p class="fw-bold mb-1">{row.name}</p>
                                <p class="text-muted mb-0">928338479</p>
                            </div>


                        </div></td>
                        <td><p class="fw-bold mb-1">{row.category}</p>
                            <p class="text-muted mb-0">description</p>
                        </td>
                        <td>{row.date}</td>
                        <td>

               
                            
                            
                            
                            


                            <div>
                                <Badge pill bg="success">
                                    {row.status}
                                </Badge>
                            </div>
                            {/* <div>
                                <Badge pill bg="secondary">
                                        {row.status}
                                </Badge>
                            </div> */}

                        </td>

            <td>{row.amount}</td>

            <td>
                <button type="button" class="btn btn-primary btn-sm">Edit</button>

            </td>
        </tr>
    ))
}
            </tbody >
        </Table >
    );
}

export default StripedRowExample;