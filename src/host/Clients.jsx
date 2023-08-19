export default function Clients({ clients }) {
    return (
        <div>
            {clients && clients.map(client => (
                <div key={client.id}>{client.contactName}</div>
            ))}

        </div>
    )
}