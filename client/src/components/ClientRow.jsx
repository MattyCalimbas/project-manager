import { FaTrash } from 'react-icons/fa';

// useMutation hook from apollo NOT react hooks
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // Preferred Method
        update(cache, { data: { deleteClient }}){
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query:GET_CLIENTS,
                data: { clients: clients.filter(client => client.id !== deleteClient.id) }
            })
        }
        // refetchQueries: [{ query: GET_CLIENTS }] <-- One way to reload component when deletion occurs //

    });
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}