import './SideBar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <Link to="/">
                <img src="/img/beer.png" alt="beer"/>
            </Link>
            <p>Ravendawn Tavern</p>
            <Link to="/hunts">
                <i className="fas fa-search"></i>
            </Link>
            <p>Hunts</p>
            <Link to="/events">
                <i className="far fa-calendar-alt"></i>
            </Link>
            <p>Events</p>
            <a href="https://ravendawndb.com" target='blank'>
                <i className="fas fa-database"></i>
            </a>
            <p>DataBase</p>
        </div>
    );
};

export default Sidebar;
