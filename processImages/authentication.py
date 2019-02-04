import requests;
import json;

"""
    Request authentication is handled via TPaaS TID.
    The TID authentication token should be included in the header when connecting to Data Ocean.
"""
def init_bearer_token(url, tid_token):
    host_identity = url;


    url = "https://"+host_identity+"/token";

    payload = "scope=openid&grant_type=client_credentials"
    headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': "Basic " + tid_token
        }


    response = requests.request("POST", url, data=payload, headers=headers)
    #Return Bearer Token in UTF-8 Format
    bt = json.loads(response.content.decode(encoding="UTF-8"))['access_token']
    return bt;
