# Rock-Paper-Scissor detector in Django rest-framework

Develop rock-paper-scissor `tflite` model using `django-rest-framework` and deploy to `heroku`

## To - Do

1. Built frontend application

## Run on local

1. Clone this repository<br>
   Clone this repo using git
   ```
   git clone https://github.com/Hyuto/rock-paper-REST.git
   ```
2. Create `virtualenv` & Install dependencies<br>
   * Create `virtualenv`
     ```
     python -m venv VENV-NAME
     ```
   * Activate `virtualenv`<br>
     **Windows**

     ```
     ./VENV-NAME/Scripts/activate
     ```

     **Linux**

     ```
     source ./VENV-NAME/bin/activate
     ```
   * Install dependencies
     ```
     pip install -r requirements.txt
     ```
3. run django
   ```
   python manage.py runserver
   ```

### Test model

Test the `tflite` model for classifying rock, paper, and scissor

```
python test/model-test.py PATH-TO-IMG-1 PATH-TO-IMG-2 ...
```

or use the default image for testing

```
python test/model-test.py
```

### Test API

Test model store on `django` by making a request call

1. run django server<br>
   ```
   python manage.py runserver
   ```
2. run `api-test.py`<br>
   In different terminal run
   ```
   python test/api-test.py URL PATH-TO-IMG
   ```

   or use the default image for testing

   ```
   python test/api-test.py localhost:8000/api/
   ```

## Heroku App

```json
{
   build  : "success",
   status : "running",
   url    : "https://rock-paper-rest.herokuapp.com/api/"
}
```