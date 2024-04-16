const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let mongoDBConnectionString = process.env.MONGO_URL;

let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    favourites: [{
        cuisineType: String,
        dishType: String,
        mealType: String,
        image: String,
        label: String,
        uri: String
    }],
    history: [{
        cuisineType: String,
        dishType: String,
        mealType: String,
        image: String,
        label: String,
        uri: String
    }],
    mealPlan: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            },
            meals: [
                {
                    mealType: {
                        type: String,
                        enum: ['Breakfast', "Lunch", "Dinner"],
                    },
                    title: String,
                    description: String,
                    recipe: {
                        image: String,
                        label: String,
                        yield: Number,
                        calories: Number,
                        uri: String
                    }
                }
            ]
        }
    ]
});

let User;

const emptyMealPlan = [
    {
        "day": "Monday",
        "meals": [
            {
                "mealType": "Breakfast",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Lunch",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Dinner",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            }
        ]
    },
    {
        "day": "Tuesday",
        "meals": [
            {
                "mealType": "Breakfast",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Lunch",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Dinner",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            }
        ]
    },
    {
        "day": "Wednesday",
        "meals": [
            {
                "mealType": "Breakfast",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Lunch",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Dinner",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            }
        ]
    },
    {
        "day": "Thursday",
        "meals": [
            {
                "mealType": "Breakfast",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Lunch",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Dinner",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            }
        ]
    },
    {
        "day": "Friday",
        "meals": [
            {
                "mealType": "Breakfast",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Lunch",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Dinner",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            }
        ]
    },
    {
        "day": "Saturday",
        "meals": [
            {
                "mealType": "Breakfast",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Lunch",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Dinner",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            }
        ]
    },
    {
        "day": "Sunday",
        "meals": [
            {
                "mealType": "Breakfast",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Lunch",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            },
            {
                "mealType": "Dinner",
                "title": "",
                "description": "",
                "recipe": {
                    "image": "",
                    "label": "",
                    "yield": 0,
                    "calories": 0,
                    "uri": ""
                }
            }
        ]
    }
]

module.exports.connect = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(mongoDBConnectionString);

        db.on('error', err => {
            reject(err);
        });

        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
};

module.exports.registerUser = function (userData) {
    return new Promise(function (resolve, reject) {

        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        } else {
            bcrypt.hash(userData.password, 10).then(hash => {

                userData.password = hash;

                let newUser = new User(userData);

                newUser.mealPlan = emptyMealPlan;

                newUser.save().then(() => {
                    resolve("User " + userData.userName + " successfully registered");
                }).catch(err => {
                    if (err.code == 11000) {
                        reject("User Name already taken");
                    } else {
                        reject("There was an error creating the user: " + err);
                    }
                })
            }).catch(err => reject(err));
        }
    });
};

module.exports.resetUserPassword = function (userData) {
    return new Promise(function (resolve, reject) {
        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        } else {
            User.findOne({ userName: userData.userName })
                .exec()
                .then(user => {
                    // if(user.password === userData.password)
                    //     reject("Password must be different from the previous one!")
                    console.log(user.password)
                    bcrypt.hash(userData.password, 10).then(hash => {
                        bcrypt.compare(userData.password, user.password)
                            .then(res => {res && reject("Password must be different from the previous one!")})

                        user.password = hash;
                        console.log(hash)
                        user.save().then(() => {
                            resolve("User " + userData.userName + "'s password successfully changed");
                        }).catch(err => {
                            if (err.code == 11000) {
                                reject("User Name already taken");
                            } else {
                                reject("There was an error creating the user: " + err);
                            }
                        })
                    }).catch(err => reject(err));
                }).catch(err => {
                    reject("Unable to find user " + userData.userName);
                });
        }
    });
}

module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {
        User.findOne({ userName: userData.userName })
            .exec()
            .then(user => {
                bcrypt.compare(userData.password, user.password).then(res => {
                    if (res === true) {
                        resolve(user);
                    } else {
                        reject("Incorrect password for user " + userData.userName);
                    }
                });
            }).catch(err => {
                reject("Unable to find user " + userData.userName);
            });
    });
};

module.exports.getFavourites = function (id) {
    return new Promise(function (resolve, reject) {
        User.findById(id)
            .exec()
            .then(user => {
                resolve(user.favourites)
            }).catch(err => {
                reject(`Unable to get favourites for user with id: ${id}`);
            });
    });
}

module.exports.addFavourite = function (id, favourite) {
    return new Promise(function (resolve, reject) {
        User.findById(id).exec().then(user => {
            if (user.favourites.length < 50) {
                User.findByIdAndUpdate(id,
                    {
                        $pull: { favourites: { uri: favourite.uri } },
                    },
                    { new: true, safe: true, upsert: true },
                ).exec()
                User.findByIdAndUpdate(id,
                    {
                        $push: { favourites: favourite }
                    },
                    { new: true, safe: true, upsert: true },
                ).exec()
                    .then(user => { resolve(user.history); })
                    .catch(err => { reject(`Unable to update history for user with id: ${id}`); })

            } else {
                reject(`Unable to update favourites for user with id: ${id}`);
            }
        })
    });
}

module.exports.removeFavourite = function (id, favourite) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(id,
            { $pull: { favourites: { uri: favourite.uri } } },
            { new: true }
        )
            .then(user => {
                resolve(user.favourites);
            })
            .catch(err => {
                reject(`Unable to update favourites for user with id: ${id}`);
            })
    });
}

module.exports.getHistory = function (id) {
    return new Promise(function (resolve, reject) {
        User.findById(id)
            .exec()
            .then(user => {
                resolve(user.history)
            }).catch(err => {
                reject(`Unable to get history for user with id: ${id}`);
            });
    });
}

module.exports.addHistory = function (id, history) {
    return new Promise(function (resolve, reject) {
        User.findById(id).exec().then(user => {
            if (user.history.length < 50) {
                User.findByIdAndUpdate(id,
                    {
                        $pull: { history: { uri: history.uri } },
                    },
                    { new: true, safe: true, upsert: true },
                ).exec()
                User.findByIdAndUpdate(id,
                    {
                        $push: { history: history }
                    },
                    { new: true, safe: true, upsert: true },
                ).exec()
                    .then(user => { resolve(user.history); })
                    .catch(err => { reject(`Unable to update history for user with id: ${id}`); })
            } else {
                reject(`Unable to update history for user with id: ${id}`);
            }
        })
    });
}

module.exports.removeHistory = function (id, history) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(id,
            {
                $pull: { history: { uri: history.uri } },
            },
            { new: true, safe: true, upsert: true },
        ).exec()
            .then(user => {
                resolve(user.history);
            })
            .catch(err => {
                reject(`Unable to remove history for user with id: ${id}`);
            })
    });
}

module.exports.getMealPlan = function (id) {
    return new Promise(function (resolve, reject) {
        User.findById(id)
            .exec()
            .then(user => {
                resolve(user.mealPlan)
            }).catch(err => {
                reject(`Unable to get meal plan for user with id: ${id}`);
            });
    });
}

module.exports.addMealPlan = function (id, mealPlan) {
    return new Promise(function (resolve, reject) {
        User.findById(id)
            .exec()
            .then(user => {
                for (let data of user.mealPlan) {
                    if (data.day === mealPlan.dayOfWeek) {
                        for (let meal of data.meals) {
                            if (meal.mealType === mealPlan.mealType) {
                                meal.title = mealPlan.title
                                meal.description = mealPlan.description
                                meal.recipe = mealPlan.recipe
                                meal.uri = mealPlan.uri
                                user.save()
                                break;
                            }
                        }
                    }
                }
                resolve(user.mealPlan);
            }).catch(err => {
                reject(`Unable to get meal plan for user with id: ${id}`);
            });
    });
}

module.exports.removeMealPlan = function (id, mealPlan) {
    return new Promise(function (resolve, reject) {
        User.findById(id)
            .then(user => {
                for (let data of user.mealPlan) {
                    if (data.day === mealPlan.dayOfWeek) {
                        for (let meal of data.meals) {
                            if (meal.mealType === mealPlan.mealType) {
                                meal.recipe.image = "",
                                    meal.recipe.label = "",
                                    meal.recipe.yield = "",
                                    meal.recipe.calories = "",
                                    meal.recipe.uri = ""
                                user.save()
                                break;
                            }
                        }
                    }
                }

                resolve(user.mealPlan);
            })
            .catch(err => {
                reject(`Unable to remove meal plan for user with id: ${id}`);
            })
    });
}

module.exports.removeAllMealPlan = function (id, mealPlan) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(id, { $set: { mealPlan: emptyMealPlan } },
            { new: true }
        )
            .then(user => {
                resolve(user.mealPlan);
            })
            .catch(err => {
                reject(`Unable to remove meal plan for user with id: ${id}`);
            })
    });
}