CREATE TABLE review_users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(100) NOT_NULL,
    user_password VARCHAR(250) NOT_NULL
)