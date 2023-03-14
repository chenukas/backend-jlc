# Jean's Lab Collection - Handmade Crafts (Frontend)

This is the backend implementation of 'Jean's LC.' handmade craft shop

### How to setup

1. Clone this repository
2. Run `npm install`inside root folder
3. Create .env file and add 
    * MONGO_URL
        This URL can be found in MongoDB Atlas(Connect applicatiion to cluster)
    * PORT
        Port number as you wish(Default 5000)
    * PASS_SECRET
        Used to encrypt password(Provide anything)
    * JWT_SECRET
        Used to encrypt jwt token(Provide anything)
    * STRIPE_KEY
        This can be found in the Stripe Developer Dashboard
    * ENV
        This defines the environment(Default development)
4. Run `npm start` command to run the server
    Appication will be serving on `localhost:5000`

### How to test

* Run `npm test` inside root folder

### CI/CD, Deployment

* GitHub Actions is configured to deploy the application to Render.com automatically, once code is merged to the main branch
* Hosted URL : [https://jeans-lab-collection.onrender.com/api]
* SonarCloud is configured to scan every pull request before merge
* SonarCloud report : [https://sonarcloud.io/summary/overall?id=chenukas_backend-jlc]