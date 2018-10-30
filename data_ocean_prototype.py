import requests
import json
from credentials import credential


def getAccessToken(host_identity, tid_base64):
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


host_identity = "https://identity.trimble.com"
host = "https://api-usw2.trimblepaas.com/data_ocean-v1.0"
owner = "ML-Capstone-2018-2019"
tid_base64 = credential
bearer_token = getAccessToken(host_identity, tid_base64)
