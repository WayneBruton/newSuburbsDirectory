create database suburbs;
use suburbs;


CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number_of_suburbs INT NOT NULL,
    option_name VARCHAR(18) NOT NULL,
    option_description VARCHAR(150) NOT NULL,
    per_month DECIMAL(6,2) NOT NULL DEFAULT 0,
    per_year DECIMAL(6,2) NOT NULL DEFAULT 0,
    once_off DECIMAL(6,2) NOT NULL DEFAULT 0
);

INSERT INTO packages (number_of_suburbs,option_name, option_description, per_month, per_year,once_off) values 
(1,'Option 1', 'Website listing One Facebook self-service business advert per week (Mondays only)', 90, 900, 140),
(1,'Option 2', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 120, 1200, 170),
(2,'Option 3', 'Website listing One Facebook self-service business advert per week (Mondays only)', 180, 1800, 230),
(2,'Option 4', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 240, 2400, 290),
(3,'Option 5', 'Website listing One Facebook self-service business advert per week (Mondays only)', 270, 270, 320),
(3,'Option 6', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 360, 3600, 410),
(4,'Option 7 (10%)', 'Website listing One Facebook self-service business advert per week (Mondays only)', 324, 3240, 374),
(4,'Option 8 (10%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 432, 4320, 482),
(5,'Option 9 (15%)', 'Website listing One Facebook self-service business advert per week (Mondays only)', 382, 3820, 432),
(5,'Option 10 (15%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 510, 5100, 560),
(6,'Option 11 (20%)' , 'Website listing One Facebook self-service business advert per week (Mondays only)', 432, 4320, 482),
(6,'Option 12 (20%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 576, 5760, 626),
(7,'Option 13 (25%)', 'Website listing One Facebook self-service business advert per week (Mondays only)', 472, 4720, 522),
(7,'Option 14 (25%)', 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)', 672, 6720, 722);


CREATE TABLE areas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    area_description VARCHAR(255) NOT NULL UNIQUE,
    isActive boolean NOT NULL DEFAULT true
);

INSERT INTO areas (area_description, isActive) values 
('Atlantic Seaboard', true),
('Cape Flats', false),
('City Bowl', true),
('Helderberg', true),
('Northern Suburbs', true),
('South Peninsula', true),
('Southern Suburbs', true),
('West Coast', true);

select * from areas;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_description VARCHAR(255) NOT NULL UNIQUE,
    isActive boolean NOT NULL DEFAULT true
);

-- NEW FILE

alter table categories add column image_url varchar(100)

INSERT INTO categories (category_description, isActive) values 
('Accomodation', true),
('Automative', true),
('Adult', true),
('Arts & Crafts', true),
('Events', true),
('Financial', true),
('Garden', true),
('House & Home', true),
('IT & Technology', true),
('Kids', true),
('Legal', true),
('Medical', true),
('Pets', true),
('Pregnancy(Babies)', true),
('Property', true),
('Travel & Tourism', true),
('Transport', true),
('Wellness & Beauty', true);

INSERT INTO categories (category_description, isActive, image_url) values 
('Jewelry & Accessories', true, '/images/areas/jewelryaccessories.png'),
('Photography', true, '/images/areas/jewelryaccessories.png')

-- INSERT INTO categories (category_description, isActive, image_url) values 
-- ('Jewelry & Accessories', true, '/images/areas/jewelryaccessories.png'),
-- ('Photography', true, '/images/areas/jewelryaccessories.png')

update categories set image_url = "/images/categories/accomodation.png" where id = 1;
update categories set image_url = "/images/categories/automotive.png" where id = 2;
update categories set image_url = "/images/categories/businessservices.png" where id = 3;
update categories set image_url = "/images/categories/artscrafts.png" where id = 4;
update categories set image_url = "/images/categories/events.png" where id = 5;
update categories set image_url = "/images/categories/financial.png" where id = 6;
update categories set category_description = "Garden & Home", image_url = "/images/categories/garden.png" where id = 7;
update categories set image_url = "/images/categories/househome.png" where id = 8;
update categories set image_url = "/images/categories/ittechnology.png" where id = 9;
update categories set image_url = "/images/categories/kids.png" where id = 10;
update categories set image_url = "/images/categories/decor.png" where id = 11;
update categories set image_url = "/images/categories/medical.png" where id = 12;
update categories set image_url = "/images/categories/pets.png" where id = 13;
update categories set image_url = "/images/categories/pregnancybabies.png" where id = 14;
update categories set image_url = "/images/categories/property.png" where id = 15;
update categories set image_url = "/images/categories/traveltourism.png" where id = 16;
update categories set image_url = "/images/categories/transport.png" where id = 17;
update categories set image_url = "/images/categories/wellnessbeauty.png" where id = 18;
update categories set image_url = "/images/categories/fooddrink.png" where id = 19;
update categories set image_url = "/images/categories/jewelryaccessories.png" where id = 20;
update categories set image_url = "/images/categories/photography.png" where id = 21;


select * from categories;


   CREATE TABLE client_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    businessName VARCHAR(60) NOT NULL UNIQUE,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    mob_no VARCHAR(13) NOT NULL,
    email VARCHAR(30) NOT NULL,
    website VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    facebook VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    instagram VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    linkedin VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    feedback VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    areas JSON NOT NULL,
    selectedOption int NOT NULL,
    catarea JSON NOT NULL,
    product_service varchar(25) not null,
    adminAssist boolean not null,
    profile_heading varchar(25) not null,
    profile_description text not null,
    profile_image VARCHAR(60),
    business_image1 VARCHAR(60),
    business_image2 VARCHAR(60),
    business_image3 VARCHAR(60),
    created_at timestamp default now(),
    terms VARCHAR(30) NOT NULL DEFAULT 'Monthly',
    profile_approved boolean default false,
    paid_to_date boolean default false,
    payment_expires timestamp default now()
    );

-- alter table client_profiles modify column payment_expires timestamp default '2000-01-01'






    desc client_profiles;


create table users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    Upassword VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    resettoken varchar(20),
    resetexpiry TIMESTAMP DEFAULT NOW()
);

insert into users (email, Upassword) values ('waynebruton@icloud.com', 'password');

CREATE TABLE charities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    businessName VARCHAR(60) NOT NULL UNIQUE,
    npo_number VARCHAR(30),
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    mob_no VARCHAR(13) NOT NULL,
    email VARCHAR(30) NOT NULL,
    website VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    facebook VARCHAR(60) NOT NULL DEFAULT 'No info Provided',
    areas INT NOT NULL,
    profile_description text not null,
    charity_image VARCHAR(60),
    bankName varchar(50),
    branchName varchar(50),
    accountNumber varchar(50),
    branchCode varchar(20),
    created_at timestamp default now(),
    isActive boolean not null default false,
    FOREIGN KEY (areas) REFERENCES areas(id)
);

-- to load asap
alter table charities add column charity_image1 varchar(60);
alter table charities add column charity_image2 varchar(60);
alter table charities add column charity_image3 varchar(60);



CREATE TABLE notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    heading VARCHAR(60) NOT NULL UNIQUE,
    areas JSON NOT NULL,
    notice_text text not null,
    notice_image VARCHAR(60),
    created_at timestamp default now(),
    isActive boolean not null default false
);



-- NEW


CREATE TABLE extra_packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(100) NOT NULL,
    option_description VARCHAR(150) NOT NULL,
    per_month DECIMAL(6,2) NOT NULL DEFAULT 0   
);

INSERT INTO extra_packages (option_name, option_description, per_month) values 
('Bishops Court Community Group', 'A piggy back site to join', 25),
('Upper Claremont Community Group', 'A piggy back site to join', 25)




alter table client_profiles add column extra_packages JSON
alter table client_profiles add column password varchar(255) not null

alter table client_profiles add column ratings float default 0;
alter table client_profiles drop column profile_heading;
alter table client_profiles drop column linkedIn;
alter table client_profiles drop column feedback;
alter table client_profiles drop column terms;
alter table client_profiles drop column product_service;
alter table client_profiles drop column adminAssist;
alter table client_profiles modify column email unique; 
alter table packages drop column per_year;
alter table packages drop column once_off;


update packages set per_month = 90 * number_of_suburbs where option_description like 'Website listing One Facebook self-service business advert per week (Mondays only)'
update packages set per_month = 120 * number_of_suburbs where option_description like 'Website listing Two Facebook self-service business adverts per week (Mondays & Thursdays only)'

create table profile_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_number INT Not Null,
    rating DECIMAL(2,1) not null,
    narrative text not null,
    created_at timestamp default now(),
    FOREIGN KEY (profile_number) REFERENCES client_profiles(id)
);



 
