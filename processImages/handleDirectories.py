import requests;
import json;



#Given host=ML-Capstone-2018-2019 - Get root node of Trimble Groups Directory
def get_directory_name(host,bearer_token):
    url = "https://"+host+"/api/browse"

    querystring = {"public":"","owner":"","name":"","parent_id":"","page":"","per_page":"","storage_identity":""}

    headers = {
        'Authorization': "Bearer "+bearer_token,
        'Content-Type': "application/json"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    ata = json.loads(response.content);
    return ata;





#Given a (node / directory) ID return the contents of the directory
def get_directory_by_id(host, directory_id, b_token):
    url = "http://"+host+"/api/browse/"

    querystring = {"public":"","owner":"","name":"","parent_id":directory_id,"page":"","per_page":"","storage_identity":""}

    headers = {
        'Authorization': "Bearer "+ b_token,
        'Content-Type': "application/json"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    #print(response.text)
    ata = json.loads(response.content);
    return ata;




