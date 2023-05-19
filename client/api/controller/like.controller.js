import Hunt from "../models/hunt.model.js";

export const likeHunt = async (req, res) => {
    try {
        const huntId = req.params.id;

        const hunt = await Hunt.findById(huntId);

        if (!hunt) {
            return res.status(404).json({ error: 'Hunt não encontrada' });
        }

        const hasLiked = hunt.likes.includes(req.userId);

        if (hasLiked) {
            return res.status(400).json({ message: 'Usuário deu like nesta hunt' });
        } else {
            hunt.likes.push(req.userId);
        }

        await hunt.save();

        res.status(200).json({ likes: hunt.likes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
};


export const unlikeHunt = async (req, res) => {
    try {
      const huntId = req.params.id;
      const userId = req.userId;
  
      const hunt = await Hunt.findById(huntId);
      if (!hunt) {
        return res.status(404).json({ message: 'Hunt não encontrada' });
      }
  
      if (!hunt.likes.includes(userId)) {
        return res.status(400).json({ message: 'Usuário não deu like nesta hunt' });
      }

      hunt.likes.pull(userId);
      await hunt.save();
  
      res.status(200).json({ message: 'Unlike realizado com sucesso' });
    } catch (error) {
      console.error('Erro ao realizar o unlike:', error);
      res.status(500).json({ message: 'Erro ao realizar o unlike' });
    }
  };

export const getLikes = async (req, res) => {
    try {
        const huntId = req.params.id;

        const hunt = await Hunt.findById(huntId);

        if (!hunt) {
            return res.status(404).json({ error: 'Hunt not found' });
        }

        res.status(200).json({ likes: hunt.likes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const checkLiked = async (req, res) => {
    const huntId = req.params.id;
    const userId = req.userId;

    try {
        const hunt = await Hunt.findById(huntId);
        if (!hunt) {
            return res.status(404).json({ error: 'Hunt não encontrada' });
        }

        const hasLiked = hunt.likes.includes(userId);
        res.status(200).json({ liked: hasLiked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
};