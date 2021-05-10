from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json
from .apps import ApiConfig

class ModelView(APIView):

    def post(self, request):
        if request.method == 'POST':
            data = json.loads(request.body)
            pred = ApiConfig.model.predict(data['image'])
            response = {'predicted' : pred[0], 'proba' : pred[1][0]}
            
            # returning JSON response
            return JsonResponse(response)