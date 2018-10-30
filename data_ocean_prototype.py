import requests
import json
from credentials import *


def main():
    bearer_token = getAccessToken()
    print(bearer_token)

def getAccessToken():
    url = host_identity + "/token"
    headers =  {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + tid_base64
    }
    data = {
        'scope': 'openid',
        'grant_type': 'client_credentials'
    }
    res = requests.post(url, data=data, headers=headers)

    # Content is a bytes object. Using json library, convert to dict (JSON)
    content = json.loads(res.content)
    return content['access_token']


if __name__== "__main__":
    main()
