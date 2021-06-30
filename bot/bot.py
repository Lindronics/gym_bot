import os
import json
import requests
import boto3
from bs4 import BeautifulSoup
from datetime import datetime
from urllib.parse import urljoin

BASE_URL = os.environ["GYM_BASE_URL"]
GYM_LOCATION = os.environ["GYM_LOCATION"]


def lambda_handler(event, context):
    with requests.Session() as sess:
        response = sess.get(BASE_URL)
        soup = BeautifulSoup(response.content, "html.parser")
        verification_token = soup.body.main.form.find_all("input")[2]["value"]

        # Sign in
        data = {
            "Email": os.environ["GYM_EMAIL"],
            "Password": os.environ["GYM_PASSWORD"],
            "__RequestVerificationToken": verification_token,
        }
        response = sess.post(
            urljoin(BASE_URL, "/account/login/"), data)

        print("Signed in")

        # Fetch data
        response = sess.get(
            urljoin(BASE_URL, f"{GYM_LOCATION}/inthevenue"))
        soup = BeautifulSoup(response.content, "html.parser")

        number = soup.body.main.h1.text
        timestamp = datetime.now().isoformat()
        print("Timestamp:", timestamp)
        print("Value fetched:", number)

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table(os.environ["TABLE_NAME"])
        response = table.put_item(Item={
            "timestamp": timestamp,
            "value": int(number),
        })
        print("Saved to database")

    return {
        "statusCode": 200,
        "body": json.dumps(int(number))
    }
