import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import Button from './button';
import { ROUTES } from '../../const/routes';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    return (
        <nav className="bg-white border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#2B7A78]">
                PetCare
            </h1>

            <div className="flex items-center gap-4">
                <Link to={ROUTES.HOME} className="text-[#2B7A78] font-medium">
                    Mascotas
                </Link>

                <Link to={ROUTES.CARETAKERS} className="text-[#2B7A78] font-medium">
                    Cuidadores
                </Link>

                <span className="text-sm text-gray-600">
                    {user?.name}
                </span>

                <Button onClick={handleLogout} fullWidth={false}>
                    Cerrar sesión
                </Button>
            </div>
        </nav>
    );
}