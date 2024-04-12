const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userService = require("./user-service.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken')

const HTTP_PORT = process.env.PORT || 8080;

// JSON Web Token Setup
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

// Configure its options
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
};

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName }); 
    } else {
        next(null, false);
    }
});

// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("hello")
})

app.post("/api/user/register", (req, res) => {
    userService.registerUser(req.body)
        .then((msg) => {
            res.json({ "message": msg });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});

app.post("/api/user/login", (req, res) => {
    userService.checkUser(req.body)
        .then((user) => {
            let payload = { 
                _id: user._id,
                userName: user.userName,
            };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ "message": "login successful", "token": token });
        }).catch(msg => {
            res.status(422).json({ "message": msg });
        });
});

app.get("/api/user/favourites",passport.authenticate('jwt', { session: false }),(req, res) => {
    userService.getFavourites(req.user._id)
        .then(data => {
            res.json(data);
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })

});

app.put("/api/user/favourites/add", passport.authenticate('jwt', { session: false }),(req, res) => {
    userService.addFavourite(req.user._id, req.body.favourite)
        .then(data => {
            res.json(data)
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
});

app.delete("/api/user/favourites/remove",passport.authenticate('jwt', { session: false }),(req, res) => {
    userService.removeFavourite(req.user._id, req.body)
        .then(data => {
            res.json(data)
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
});

app.get("/api/user/history",passport.authenticate('jwt', { session: false }),(req, res) => {
    userService.getHistory(req.user._id)
        .then(data => {
            res.json(data);
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
});

app.put("/api/user/history/add", passport.authenticate('jwt', { session: false }),(req, res) => {
    userService.addHistory(req.user._id, req.body.history)
        .then(data => {
            res.json(data)
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
});

app.delete("/api/user/history/remove",passport.authenticate('jwt', { session: false }),(req, res) => {
    userService.removeHistory(req.user._id, req.body)
        .then(data => {
            res.json(data)
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
});

app.get('/api/user/mealPlan', passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.getMealPlan(req.user._id)
        .then(data => {
            res.json(data);
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
})

app.put('/api/user/mealPlan/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.addMealPlan(req.user._id, req.body.mealPlan)
        .then(data => {
            res.json(data);
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
})

app.delete('/api/user/mealPlan/remove', passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.removeMealPlan(req.user._id, req.body.mealPlan)
        .then(data => {
            res.json(data);
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
})

app.delete('/api/user/mealPlan/removeAll', passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.removeAllMealPlan(req.user._id)
        .then(data => {
            res.json(data);
        }).catch(msg => {
            res.status(422).json({ error: msg });
        })
})

userService.connect()
.then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: http://localhost:" + HTTP_PORT) });
})
.catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
});