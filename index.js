var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
const axios = require('axios');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
// Initialize built-in middleware for urlencoding and json

const cors = require('cors');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const fetch = require('cross-fetch');

var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url)
.then(() => {
	app.listen(port);
	console.log("App listening on port : " + port);
    
})
.catch((err) => {console.log(err)
})

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


var Airbnb = require('./models/listingsAndReviews');
var User = require('./models/users');
var Booking = require('./models/booking');

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));









 //get a listing from db by its type   
 app.get('/airbnb/search/type/:keyword', function(req, res) {
    let keyword = req.params.keyword;
    Airbnb.find({room_type: { $regex: keyword, $options: 'i' }})
    .then(airbnbs => {
        res.json(airbnbs);
    })
    .catch(err => {
        res.send(err);
    });
});







app.get('/airbnb/sum/:availability', function(req, res) {
    const availability = req.params.availability;
    const availabilityType = `availability.${availability}`;
    Airbnb.aggregate([
        {
            $group: {
                _id: null,
                sum: { $sum: `$${availabilityType}` }
            }
        }
    ])
    .then(result => {
        res.json(result[0].sum);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});




 //get a listing from db by its ammenties   
 app.get('/airbnb/search/amenities/:keyword', function(req, res) {
    let keyword = req.params.keyword;
    let regex = new RegExp(keyword, "i");
    Airbnb.find({ amenities: regex })
    .then(airbnbs => {
        res.json(airbnbs);
    })
    .catch(err => {
        res.send(err);
    });
});



//add a new user to db
app.post('/airbnb/user', function(req, res) {
    User.create({
        email: req.body.email,  
        password: req.body.password,
        role: "user", //default role is "user"
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    .then(user => {
        res.send(user);
    })
    .catch(err => {
        res.send(err);
    });
    });


 






//Create mongose method to update an existing record into collection
app.put('/airbnb/:Id', function(req, res) {
	
	let coordinates,amenities,host_verifications;

//if(req.body.coordinates)
//coordinates = req.body.coordinates.split(",");

if(req.body.amenities)
amenities = req.body.amenities.split(",");

if(req.body.host_verifications)
host_verifications = req.body.host_verifications.split(",");

	let data = 
	{ _id: req.body._id,
        access: req.body.access,
        accommodates: req.body.accommodates,
        address: {
            country: req.body.country,
            country_code: req.body.country_code,
            government_area: req.body.government_area,
           /* location: {
                //coordinates: coordinates,
                is_location_exact: req.body.is_location_exact,
                type: req.body.type
            },*/
                market: req.body.market,
                street: req.body.street,
                suburb: req.body.suburb,
            
    
        },
        amenities: amenities,
        availability: {
            availability_30: req.body.availability_30,
            availability_60: req.body.availability_60,
            availability_90: req.body.availability_90,
            availability_365: req.body.availability_365,
        },
        bathrooms: req.body.bathrooms,
        bed_type: req.body.bed_type,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        calendar_last_scraped: req.body.calendar_last_scraped,
        cancellation_policy: req.body.cancellation_policy,
        cleaning_fee: req.body.cleaning_fee,
        description: req.body.description,
        extra_people: req.body.extra_people,
        first_review: req.body.first_review,
        guests_included: req.body.guests_included,
        host: {
            host_id: req.body.host_id,
            host_about: req.body.host_about,
            host_has_profile_pic: req.body.host_has_profile_pic,
            host_indentity_verified: req.body.host_indentity_verified,
            host_is_superhost: req.body.host_is_superhost,
            host_listings_count: req.body.host_listings_count,
            host_location: req.body.host_location,
            host_name: req.body.host_name,
            host_neighbourhood: req.body.host_neighbourhood,
            host_picture_url: req.body.host_picture_url,
            host_response_rate: req.body.host_response_rate,
            host_response_time: req.body.host_response_time,
            host_thumbnail_url: req.body.host_thumbnail_url,
            host_total_listings_count: req.body.host_total_listings_count,
            host_url: req.body.host_url,
            host_verifications: host_verifications,
            house_rules: req.body.house_rules,
        },
        images: {
            picture_url: req.body.picture_url,
            thumbnail_url: req.body.thumbnail_url,
            medium_url: req.body.medium_url,
            xl_picture_url: req.body.xl_picture_url,
        },
        interaction: req.body.interaction,
        last_review: req.body.last_review,
        last_scraped: req.body.last_scraped,
        listing_url: req.body.listing_url,
        maximum_nights: req.body.maximum_nights,
        monthly_price: req.body.monthly_price,
        name: req.body.name,
        neighbourhood_overview: req.body.neighbourhood_overview,
        notes: req.body.notes,
        number_of_reviews: req.body.number_of_reviews,
        price: req.body.price,
        property_type: req.body.property_type,
        review_scores: {
            review_scores_accuracy: req.body.review_scores_accuracy,
            review_scores_checkin: req.body.review_scores_checkin,
            review_scores_cleanliness: req.body.review_scores_cleanliness,
            review_scores_communication: req.body.review_scores_communication,
            review_scores_location: req.body.review_scores_location,
            review_scores_rating: req.body.review_scores_rating,
            review_scores_value: req.body.review_scores_value,
        },
        reviews: {
            __id: req.body.__id,
            date: req.body.date,
            listing_id: req.body.listing_id,
            reviewer_id: req.body.reviewer_id,
            reviewer_name: req.body.reviewer_name,
            comments: req.body.comments
        },
        reviews_per_month: req.body.reviews_per_month,
        room_type: req.body.room_type,   
        security_deposit: req.body.security_deposit,
        space: req.body.space,
        summary: req.body.summary,
        transit: req.body.transit,
        weekly_price: req.body.weekly_price
}

	// save the movie
	Airbnb.findByIdAndUpdate({_id:req.params.Id}, data).then(function(err, movie) {
	

	res.send('Successful! Movie has been Updated.');
	}).catch((err) => res.send(err));
});


         
  //Delete record
app.delete('/airbnb/:Id', function(req,res)
{
    Airbnb.findByIdAndRemove({_id:req.params.Id}).then(function(result)
    {
        console.log(result.toString());
        res.send('Successful! Movie has been Deleted.');f
    })
    .catch((err) => res.send(err));

});

app.post('/airbnb/login', async(req, res) => {
    const { email, password } = req.body;

    //Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    //Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
    }


  // Create JWT
  var token = jwt.sign({ userId: user._id ,role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Return token to client
  res.json({ token, user });
  
});



const verifyToken = (req, res, next) => {
    var token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
  
    try {
        if (token.startsWith("Bearer ")) {
            console.log("Token found");
            token = token.substring(7);
          }

        

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };


// get a listing from db by its id
app.get('/airbnb/:id', verifyToken, async(req, res)=> {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found'});
    }
    else{
    let id = req.params.id;
    Airbnb.findById(id)
    .then(airbnb => {
    res.json(airbnb);
    })
    .catch(err => {
    res.send(err);
    });
}
    });


    //get all listing data from db
app.get('/airbnb', verifyToken,async (req, res)=> {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found'});
    }
    else{
    Airbnb.countDocuments().then(count => {
      let perPage = count;
      let page = 0;
      let filter = {};
      if(req.query.page && req.query.page > 0)
        page = req.query.page;
  
      if(req.query.perPage && req.query.perPage > 0)
        perPage = req.query.perPage;
  
      let skip = page * perPage;
  
      if(req.query.name) {
        let name = req.query.name;
        let regex = new RegExp(name, "i");
        filter = {name: regex};
      }
  
      Airbnb.find(filter, {}, {skip: skip, limit: perPage, sort: {_id: 1}})
  .then(airbnbs => {
    res.send(airbnbs);
  })
  .catch(err => {
    res.send(err);
  });
    
    });
}
  });


//Create mongose method to add an existing record into collection
app.post('/airbnb',verifyToken,async (req, res) =>{
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found'});
    }
    else{
	
	let amenities,host_verifications;

if(req.body.amenities)
amenities = req.body.amenities.split(",");

if(req.body.host_verifications)
host_verifications = req.body.host_verifications.split(",");

Airbnb.create({
    _id: req.body._id,
        access: req.body.access,
        accommodates: req.body.accommodates,
        address: {
            country: req.body.country,
            country_code: req.body.country_code,
            government_area: req.body.government_area,
           
                market: req.body.market,
                street: req.body.street,
                suburb: req.body.suburb,
            
    
        },
        amenities: amenities,
        availability: {
            availability_30: req.body.availability_30,
            availability_60: req.body.availability_60,
            availability_90: req.body.availability_90,
            availability_365: req.body.availability_365,
        },
        bathrooms: req.body.bathrooms,
        bed_type: req.body.bed_type,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        calendar_last_scraped: req.body.calendar_last_scraped,
        cancellation_policy: req.body.cancellation_policy,
        cleaning_fee: req.body.cleaning_fee,
        description: req.body.description,
        extra_people: req.body.extra_people,
        first_review: req.body.first_review,
        guests_included: req.body.guests_included,
        host: {
            host_id: req.body.host_id,
            host_about: req.body.host_about,
            host_has_profile_pic: req.body.host_has_profile_pic,
            host_indentity_verified: req.body.host_indentity_verified,
            host_is_superhost: req.body.host_is_superhost,
            host_listings_count: req.body.host_listings_count,
            host_location: req.body.host_location,
            host_name: req.body.host_name,
            host_neighbourhood: req.body.host_neighbourhood,
            host_picture_url: req.body.host_picture_url,
            host_response_rate: req.body.host_response_rate,
            host_response_time: req.body.host_response_time,
            host_thumbnail_url: req.body.host_thumbnail_url,
            host_total_listings_count: req.body.host_total_listings_count,
            host_url: req.body.host_url,
            host_verifications: host_verifications,
            house_rules: req.body.house_rules,
        },
        images: {
            picture_url: req.body.picture_url,
            thumbnail_url: req.body.thumbnail_url,
            medium_url: req.body.medium_url,
            xl_picture_url: req.body.xl_picture_url,
        },
        interaction: req.body.interaction,
        last_review: req.body.last_review,
        last_scraped: req.body.last_scraped,
        listing_url: req.body.listing_url,
        maximum_nights: req.body.maximum_nights,
        monthly_price: req.body.monthly_price,
        name: req.body.name,
        neighbourhood_overview: req.body.neighbourhood_overview,
        notes: req.body.notes,
        number_of_reviews: req.body.number_of_reviews,
        price: req.body.price,
        property_type: req.body.property_type,
        review_scores: {
            review_scores_accuracy: req.body.review_scores_accuracy,
            review_scores_checkin: req.body.review_scores_checkin,
            review_scores_cleanliness: req.body.review_scores_cleanliness,
            review_scores_communication: req.body.review_scores_communication,
            review_scores_location: req.body.review_scores_location,
            review_scores_rating: req.body.review_scores_rating,
            review_scores_value: req.body.review_scores_value,
        },
        reviews: {
            date: req.body.date,
            listing_id: req.body.listing_id,
            reviewer_id: req.body.reviewer_id,
            reviewer_name: req.body.reviewer_name,
            comments: req.body.comments
        },
        reviews_per_month: req.body.reviews_per_month,
        room_type: req.body.room_type,   
        security_deposit: req.body.security_deposit,
        space: req.body.space,
        summary: req.body.summary,
        transit: req.body.transit,
        weekly_price: req.body.weekly_price
}).then(function(airbnb) {
    res.status(200).send('Successful! Airbnb has been added.');
})
.catch(function(err) {
    console.error(err);
    res.status(500).send('Error! Airbnb could not be added.');
});
    }
});


  //add a new user to db
app.post('/bookings', function(req, res) {
    Booking.create({
        listing_id: req.body.listing_id,
        user_id: req.body.user_id,
        check_in: req.body.check_in,
        check_out: req.body.check_out

      

    })
    .then(bookings => {
        res.send(bookings);
    })
    .catch(err => {
        console.log(req.body.listing_id);
        console.log(req.body.check_in);
        console.log(req.body.check_out);
        console.log(req.body.user_id);
        res.send(err);
    });
    });


app.get('/bookings/:user_id', verifyToken, async(req, res)=> {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found'});
    }
    else{
    let user_id = req.params.user_id
    Booking.findById(user_id)
    .then(airbnb => {
    res.json(airbnb);
    })
    .catch(err => {
    res.send(err);
    });
}
    });




//Wrong route
app.get('*', function(req, res) {
	res.status(404).render('error', { title: 'Error', message:'Wrong Route' });   //Render error.hbs
});