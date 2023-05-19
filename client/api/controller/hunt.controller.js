import Hunt from "../models/hunt.model.js";
import User from "../models/user.model.js"
import createError from "../utils/createError.js";

export const createHunt = async (req, res, next) => {
  const newHunt = new Hunt({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedHunt = await newHunt.save();
    res.status(201).json(savedHunt);
  } catch (err) {
    next(err);
  }
};

export const deleteHunt = async (req, res, next) => {
  try {
    const hunt = await Hunt.findById(req.params.id);
    if (hunt.userId !== req.userId)
      return next(createError(403, "You can delete only your Hunt!"));

    await Hunt.findByIdAndDelete(req.params.id);
    res.status(200).send("Hunt has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getHunt = async (req, res, next) => {
  try {
    const hunt = await Hunt.findById(req.params.id);
    if (!hunt) next(createError(404, "Hunt not found!"));
    res.status(200).send(hunt);
  } catch (err) {
    next(err);
  }
};

export const getHunts = async (req, res, next) => {
  try {
    const { sortBy } = req.query;
    let hunts;

    if (sortBy) {
      hunts = await Hunt.find().sort(`-${sortBy}`); // Ordena de forma descendente
    } else {
      hunts = await Hunt.find();
    }

    res.status(200).send(hunts);
  } catch (err) {
    next(err);
  }
}

export const getMyHunts = async (req, res, next) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário logado a partir do token ou sessão
    const { sortBy } = req.query;
    let hunts;

    if (sortBy) {
      hunts = await Hunt.find({ userId: userId }).sort(`-${sortBy}`);
    } else {
      hunts = await Hunt.find({ userId: userId });
    }

    res.status(200).send(hunts);
  } catch (err) {
    next(err);
  }
}

export const saveHunt = async (req, res) => {
  try {
    const huntId = req.params.id;
    const userId = req.userId;

    const hunt = await Hunt.findById(huntId);
    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    const isSaved = hunt.saved.includes(userId);
    if (isSaved) {
      return res.status(400).json({ message: 'Hunt already saved' });
    }

    hunt.saved.push(userId);
    await hunt.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.savedHunts.push(hunt);
    await user.save();

    res.status(200).json({ message: 'Hunt saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const unsaveHunt = async (req, res) => {
  try {
    const huntId = req.params.id;
    const userId = req.userId;

    const hunt = await Hunt.findById(huntId);
    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    const isSaved = hunt.saved.includes(userId);
    if (!isSaved) {
      return res.status(400).json({ message: 'Hunt is not saved' });
    }

    hunt.saved.pull(userId);
    await hunt.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.savedHunts.pull(huntId);
    await user.save();

    res.status(200).json({ message: 'Hunt unsaved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const checkSaved = async (req, res) => {
  try {
    const huntId = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isSaved = user.savedHunts.includes(huntId);
    res.status(200).json({ saved: isSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const getSavedHunts = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { sortBy } = req.query;
    let user;

    if (sortBy) {
      user = await User.findById(userId).populate({
        path: 'savedHunts',
        options: { sort: `-${sortBy}` }
      });
    } else {
      user = await User.findById(userId).populate('savedHunts');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedHunts = user.savedHunts;
    res.status(200).json(savedHunts);
  } catch (err) {
    next(err);
  }
};
