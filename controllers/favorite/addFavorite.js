const  UserFavorite  = require("../../models/userFavorite");
const RecipeFavorite = require('../../models/recipeFavorite')
const { HttpError } = require("../../helpers");

const addFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { recipeId } = req.params;

  const userFavorite = await UserFavorite.findOne({ userId, recipe: recipeId });

  if (userFavorite) {
    throw HttpError(
      409,
      `The recipe with id - ${recipeId} already exists in favorites of the user with id - ${userId}`
    );
  }
  await UserFavorite.create({ userId, recipe: recipeId });

  const recipeFavorite = await RecipeFavorite.findOne({ recipe: recipeId });

  if (recipeFavorite) {
    recipeFavorite.amount += 1;
    await recipeFavorite.save();
  } else {
    await RecipeFavorite.create({ recipe: recipeId, amount: 1 });
  }

  res.status(201).json({
    status: "success",
    code: 201,
    id: recipeId,
    favorite: true,
    message: `Recipe with ${recipeId} was added to favorites`,
  });
};

module.exports = addFavorite;
