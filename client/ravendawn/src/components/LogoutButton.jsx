import newRequest from '../utils/newRequest';
import './LogoutButton.css';
import { Link, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser", null);
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Link onClick={handleLogout}>
            Logout
        </Link>
    );
};

export default LogoutButton;