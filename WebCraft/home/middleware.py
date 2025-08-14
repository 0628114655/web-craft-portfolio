import uuid
from .models import *

class VisitorIDMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        visitor_id = request.COOKIES.get('visitor_id')

        response = self.get_response(request)

        if not visitor_id:
            visitor_id = str(uuid.uuid4())
            response.set_cookie(
                'visitor_id',
                visitor_id,
                max_age=60*60*24*30,  
                httponly=False,
                samesite='Lax',
                secure=False  
            )
        return response