import Card from './ui/card';

export default function CaretakerCard({ caretaker }) {
    return (
        <Card>
            <h2 className="text-lg font-bold">{caretaker.name}</h2>
            <p>{caretaker.email}</p>
        </Card>
    );
}