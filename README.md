<img align="right" height="100" src="https://github.com/GameBear64/InquireHub/assets/33098072/d62c8b1e-318e-468b-a198-60f3d41bab9d">

# Inquire Hub
> Share Your Thoughts, Spark Conversations!
  
A simple chat app for anonymous questions and answers featuring profiles and auth guards, themes, real time updates, form validations and more!

## Instalation
When installing all the app's dependencies youll need to run these two commands
```bash
npm i
cd api && npm i
```

After that you can start the application (both FE and BE) in development mode by simply writing
```bash
npm run dev
```
You should see something like this:
![example](https://github.com/GameBear64/InquireHub/assets/33098072/38694029-c81e-4de7-af6f-8d81c6d0c10c)



## Features
The whole app uses both a socket for real time connection and a REST API for regular requests.

### FE
Main dependencies:
- Vue js
- Vuelidate
- awesome-snackbar
- Tailwind
- Material Icons

The front end features a combination of light and dark theme + an accent color
![inquire-hub-themes](https://github.com/GameBear64/InquireHub/assets/33098072/5a5e43e4-a16b-44a3-b0ec-17d80d6aeeec)

Using Vuelidate we ensure the user knows where their errors are (and if they bypass it we have extra validation on the backend)
![image](https://github.com/GameBear64/InquireHub/assets/33098072/0a2932e7-9515-488d-8819-fbc7f08a70c7)

Seemless updates with socket.io  
Here the reaction updates whenever the server emits an event
![socket-events](https://github.com/GameBear64/InquireHub/assets/33098072/8e6b78cf-5f62-4512-bf30-1f31d785dc40)


### BE
Main dependencies:
- bcryptjs
- express
- express-file-routing
- golb
- joi validator
- jwt
- mongoose

Strong password encryption with bcrypt (this is an example document)
![image](https://github.com/GameBear64/InquireHub/assets/33098072/92e81c56-2317-40a6-9080-ad7c4e7ecb54)

Custom middleware for validation using joi validate
![image](https://github.com/GameBear64/InquireHub/assets/33098072/b581eb10-ea24-4d9f-915b-cd989cb95509)



## Author
Developed designed by [GamBar](https://github.com/GameBear64)  
For educational purposes, and the `SoftUni VueJS` course
