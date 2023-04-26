var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const listingsAndReviewsSchema = new Schema({

_id: "String",
    access: "String",
    accommodates: "Number",
    address: {
        country: "String",
        country_code: "String",
        government_area: "String",
        location: {
            coordinates: ["Number"],
            is_location_exact: Boolean,
            type: "string"
        },
            market: "String",
            street: "String",
            suburb: "String"
        

    },
    amenities: ["String"],
    availability: {
        availability_30: "Number",
        availability_60: "Number",
        availability_90: "Number",
        availability_365: "Number",
    },
    bathrooms: "Number",
    bed_type: "String",
    bedrooms: "Number",
    beds: "Number",
    calendar_last_scraped: "Date",
    cancellation_policy: "String",
    cleaning_fee: "Number",
    description: "string",
    extra_people: "Number",
    first_review: "Date",
    guests_included: "Number",
    host: {
        host_id: "Number",
        host_about: "String",
        host_has_profile_pic: Boolean,
        host_indentity_verified: Boolean,
        host_is_superhost: Boolean,
        host_listings_count: "Number",
        host_location: "String",
        host_name: "String",
        host_neighbourhood: "String",
        host_picture_url: "String",
        host_response_rate: "Number",
        host_response_time: "String",
        host_thumbnail_url: "String",
        host_total_listings_count: "Number",
        host_url: "String",
        host_verifications: ["String"],
        house_rules: "String"
    },
    images: {
        picture_url: "String",
        thumbnail_url: "String",
        medium_url: "String",
        xl_picture_url: "String"
    },
    interaction: "String",
    last_review: "Date",
    last_scraped: "Date",
    listing_url: "String",
    maximum_nights: "Number",
    monthly_price: "Number",
    name: "String",
    neighbourhood_overview: "String",
    notes: "String",
    number_of_reviews: "Number",
    price: "Number",
    property_type: "String",
    review_scores: {
        review_scores_accuracy: "Number",
        review_scores_checkin: "Number",
        review_scores_cleanliness: "Number",
        review_scores_communication: "Number",
        review_scores_location: "Number",
        review_scores_rating: "Number",
        review_scores_value: "Number"
    },
    reviews: {
        __id: "String",
        date: "Date",
        listing_id: "Number",
        reviewer_id: "Number",
        reviewer_name: "String",
        comments: "String"
    },
    reviews_per_month: "Number",
    room_type: "String",    
    security_deposit: "Number",
    space: "String",
    summary: "String",
    transit: "String",
    weekly_price: "Number"

}, { collection: 'listingsAndReviews' });

module.exports = mongoose.model('listingsAndReview', listingsAndReviewsSchema);