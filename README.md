# Dog Tinder

Dog Tinder is a single-page application that matches dog owners with other dogs owners based on their mutual interests on each other dogs.

## About

Tinder for dogs. The app is a matching application modelled after Tinder. The matching algorithm takes in various attributes
of both the dog owners and dogs to make suggestions. If owners express mutual interests, they will be notified and can choose to contact
each other.

## Developing

### Built With

1. MongoDB
   - Mongoose
   - Atlas Cloud
1. Express
1. React
   - Hooks: useState, useEffect
   - Material-UI
   - Formik
1. Node
1. AJAX/Axios
1. Heroku

### Setting up Dev

To develop the app, clone the project and install the dependencies listed in `package.json` with:

```
git clone https://github.com/Jayyr2040/dog-tinder.git
cd dog-tinder
npm ci
```

Set up your `.env` with your local ports, e.g.,

```
PORT=3003
MONGODB_URI=mongodb://localhost:27017/dog-tinder
SECRET=YourSecretHere
```

After which, install the React app in the `client` folder

```
cd client
npm ci
```

## Wireframes

### Log in page

![Wireframe1](https://i.ibb.co/JCy9MBQ/home.png)

### Browse page

![Wireframe2](https://i.ibb.co/pQGLzsz/browse.png)

### Match page

![Wireframe2](https://i.ibb.co/Kh9X8zw/match.png)

## User Stories

#### Landing Page

1. On reaching the landing page, users should not be able to do anything but to "Register" or "Login".

#### Authentication

1. A user should be able to register an account and fill up their user profile.
1. Upon registering, a user should be directed to an add-dog-profile page.
1. A user should be able to browse dogs in the vicinity upon registration and logging in.
1. A user should be able to update their and their dog’s profiles.
1. A user should be redirected to the landing page after logging out.

#### Browsing

1. A user should be presented with a dog profile on the screen at a given time.
1. A user should be able to (1) like a dog or (2) skip selection.
1. Upon expressing like, a user should no longer be able to see the profile.
1. A user should not be able to know that other users show interest in their dogs, unless they have reciprocated the interest as well.
1. When two users show interest in each other’s dog, the users should be notified of the mutual interest.

#### Match Event

1. The user should be able to see the matched dog & user (dog owner) profiles in the matched list.
1. A user should have the option of following up with the match with the contact details (email) of the other party.
1. A user should be able to refer back to the matched list whenever.
1. In the matched list, a user should be able to rescind their interest and remove the match from their matched list.
