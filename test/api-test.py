import sys, os, requests
import numpy as np
from time import time
from json import dumps
from PIL import Image

def preprocess(image_dir):
    image = Image.open(image_dir)
    image = image.resize((128, 128)).convert('RGB')
    return np.array(image).tolist()

def make_request(PORT, image):
    headers = {"content-type": "application/json"}
    data = dumps({'image' : image})
    
    start = time()
    req = requests.post(f'http://127.0.0.1:{PORT}/api/', data = data)
    duration = time() - start
    return req, duration

if __name__ == '__main__':
    args = sys.argv[1:]
    if len(args) == 1:
        image_dir = 'test/testpaper01-00.png'
    else:
        image_dir = args[1]

    image = preprocess(image_dir)
    response, duration = make_request(args[0], image)

    print(f'Status : {response.status_code}')
    for key, value in response.json().items():
        print(f'{key} : {value}')
    print(f'time : {round(duration, 5)} s')