import Card from './ui/card';
import Button from './ui/button';

export default function PetCard({ pet, isCaretaker }) {
    return (
        <Card>
            <h2 className="text-lg font-bold">{pet.name}</h2>
            <p>{pet.species}</p>
            <p>{pet.age} años</p>

            {isCaretaker && (
                <Button onClick={() => alert('Elegiste mascota')}>
                    Cuidar
                </Button>
            )}
        </Card>
    );
}