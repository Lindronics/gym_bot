from boto3 import resource
from boto3.dynamodb.conditions import Key
import os
from datetime import datetime


def lambda_handler(event, context):

    params = event["queryStringParameters"]
    start = datetime.fromtimestamp(params["start"])
    end = datetime.fromtimestamp(params["end"])
    
    dynamodb = resource("dynamodb")
    table = dynamodb.Table(os.environ["TABLE_NAME"])
    
    response = table.query(
        KeyConditionExpression=(Key("timestamp").lte(end) & Key("timestamp").gte(start))
    )

    return {
        "statusCode": 200,
        "body": response
    }
