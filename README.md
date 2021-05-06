# Rock-Paper-Scissor detector in Django rest-framework

Develop rock-paper-scissor `tflite` model using `django-rest-framework` and deploy to `heroku`

## To - Do

1. Using React in frontend to consume API

## Test model

Test the `tflite` model for classifying rock, paper, and scissor

```
python test/model-test.py PATH-TO-IMG-1 PATH-TO-IMG-2 ...
```

or use the default image for testing

```
python test/model-test.py
```

## Test API

Test model store on `django` by making a request call

1. runserver<br>
   ```
   python manage.py runserver
   ```
2. test script<br>
   In different terminal run
   ```
   python test/api-test.py URL PATH-TO-IMG
   ```

   or use the default image for testing

   ```
   python test/api-test.py localhost:8000/api/
   ```

## Heroku

```json
{
   build  : "failed",
   status : "crashed",
   url    : "https://rock-paper-rest.herokuapp.com/api/"
}
```