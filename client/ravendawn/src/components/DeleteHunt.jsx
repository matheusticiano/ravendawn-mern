import newRequest from "../utils/newRequest";
import './DeleteHunt.css';

const DeleteHunt = ({ huntId }) => {
    const handleDelete = async () => {
        try {
            await newRequest.delete(`hunts/${huntId}`);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <button className="adelete-button" onClick={handleDelete}>
                <i className="fa fa-trash"></i>
            </button>
        </div>
    );
};

export default DeleteHunt;
