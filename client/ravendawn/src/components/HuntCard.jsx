import './HuntCard.css';
import LikeButton from './LikeButton';
import DeleteHunt from './DeleteHunt';
import SaveHunt from './SaveHunts';


const HuntCard = ({ hunt, location, level, image, profit, xp, huntId, showMenu }) => {
    return (
        <div className="hunt-card">
            <img src={image} alt={hunt} />
            <h2>{hunt}</h2>
            <div className='card-info'>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Level:</strong> {level}</p>
                <p><strong>Profit Por Hora:</strong> {profit}</p>
                <p><strong>Xp Por Hora:</strong> {xp}</p>
            </div>
            <div className='card-buttons'>
                <LikeButton huntId={huntId} />
                <SaveHunt huntId={huntId} />
            </div>
            {showMenu && (
                <div className='delete-button'>
                    <DeleteHunt huntId={huntId} />
                </div>
            )}
        </div>
    );
};

export default HuntCard;