import { useState } from "react";
import './CreateHunt.css';
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";

const HuntForm = () => {
  const [hunt, setHunt] = useState("");
  const [xp, setXp] = useState("");
  const [profit, setProfit] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const createNewHunt = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      
      await newRequest.post("/hunts", { hunt, level, profit, xp, location, image: url });

      navigate("/hunts")
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Faça login para criar novas hunts.");
      } else {
        setError("Ocorreu um erro ao criar a hunt. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="create-hunt-back">
      <form className="hunt-form" onSubmit={createNewHunt}>
        <input
          className="hunt-input"
          type="text"
          placeholder="Hunt-Name"
          value={hunt}
          onChange={(e) => setHunt(e.target.value)}
        />
        <label className="Label">Selecione uma imagem:</label>
        <input
          id="fileInput"
          className="hunt-input"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          className="hunt-input"
          type="number"
          placeholder="Recommended Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          className="hunt-input"
          type="number"
          placeholder="Profit per Hour"
          value={profit}
          onChange={(e) => setProfit(e.target.value)}
        />
        <input
          className="hunt-input"
          type="number"
          placeholder="XP per Hour"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
        />
        <input
          className="hunt-input"
          type="text"
          placeholder="Hunt Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="hunt-button" type="submit">Create Hunt</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default HuntForm;
