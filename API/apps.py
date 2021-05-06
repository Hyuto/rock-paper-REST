from django.apps import AppConfig
from numpy import argmax
import tflite_runtime.interpreter as tflite

class TFModel:
    label = ['rock', 'paper', 'scissors']

    def __init__(self, model_path):
        self.interpreter = tflite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        # IO details
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()
        self.input_shape = self.input_details[0]['shape']

    def predict(self, img):
        self.interpreter.set_tensor(self.input_details[0]['index'], img.reshape(self.input_shape))
        self.interpreter.invoke()
        proba = self.interpreter.get_tensor(self.output_details[0]['index'])

        return self.label[argmax(proba)], proba

class ApiConfig(AppConfig):
    name = 'API'
    model = TFModel('saved_model/model.tflite')
