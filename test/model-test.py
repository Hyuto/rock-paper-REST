import sys, os
import numpy as np
from PIL import Image
import tflite_runtime.interpreter as tflite

class Model:
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

        return self.label[np.argmax(proba)]

def preprocess(image_dir):
    image = Image.open(image_dir)
    image = image.resize((128, 128)).convert('RGB')
    image = np.array(image, dtype=np.float32) / 255.0
    return image

if __name__ == '__main__':
    args = sys.argv[1:]
    if not args:
        image_dir = ['test/testpaper01-00.png']
    else:
        image_dir = args
    
    # Model
    model = Model('saved_model/model.tflite')

    # Predict
    for img in image_dir:
        print(f'{os.path.split(img)[-1]} is a {model.predict(preprocess(img))}')