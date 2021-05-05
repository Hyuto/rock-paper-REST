from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json
import numpy as np
from .apps import ApiConfig

class ModelView(APIView):
    def preprocess(self, image):
        return np.array(image, dtype=np.float32) / 255.0

    def post(self, request):
        if request.method == 'POST':
            data = json.loads(request.body)
            image = self.preprocess(data['image'])
            response = {'predicted' : ApiConfig.model.predict(image)}
            
            # returning JSON response
            return JsonResponse(response)