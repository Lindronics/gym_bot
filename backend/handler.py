from boto3 import resource
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime
import os
import simplejson as json


def lambda_handler(event, context):

    try:
        params = event["queryStringParameters"]
        start = datetime.fromtimestamp(int(params["start"]))
        end = datetime.fromtimestamp(int(params["end"]))
    except:
        return {
            "statusCode": 400,
            "body": "Missing or incorrect query parameters."
        }
    
    dynamodb = resource("dynamodb")
    table = dynamodb.Table(os.environ["TABLE_NAME"])
    
    response = table.scan(
        FilterExpression=(Attr("timestamp").between(start.isoformat(), end.isoformat()))
    )

    response = sorted(response["Items"], key=lambda x: x["timestamp"])

    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }
