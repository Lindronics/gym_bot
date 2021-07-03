from backend.handler import lambda_handler
from unittest import TestCase, mock
import os


@mock.patch.dict(os.environ, {"TABLE_NAME": "GymVisitors"})
class HandlerTest(TestCase):
    def setUp(self):
        self.handler = lambda_handler

    def test_happy(self):
        try:
            res = self.handler({"queryStringParameters": {
                "start": 1620300178, "end": 1625300178}}, {})
            print(res)
        except:
            self.fail("Function threw an error")
