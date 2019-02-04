"""
Python Libraries
"""
import numpy as np;
import pandas as pd;
import requests;
import json;
import urllib.request as urllib

"""
External Files
"""
import authentication as auth

import handleDirectories as hd

import getImages as gi

import processImages as pi
"""
    Name: Robert Renecker & Trimble Group Affiliates
    Date Created: 11/13/2018
"""

def main():
    #Fill In Data
    host_identity = "{{FILL IN host identity}}"
    host = "{{FILL IN host}}"

    tid_token = "{{FILL IN WITH base 64 token that was given to you}}"

    b_token = auth.init_bearer_token(host_identity, tid_token)

    #Get top level of tree (our parent CU-Capstone-Node)
    parent_pagnated_node = hd.get_directory_name(host, str(b_token));

    #This is the parent ID
    parent_id = parent_pagnated_node['items'][0]['id'];
    #Retrieve child node (MTX9 node)
    pagnated_directory_nodes = hd.get_directory_by_id(host, parent_id, b_token);

    #Now get the children for MTX9 Node --> Should have our URLS / image directories.
    municipal_directory_parent_id = pagnated_directory_nodes['items'][0]['id'];
    municipal_directory = hd.get_directory_by_id(host, municipal_directory_parent_id, b_token);

    #Get URLS from node
    url_for_images = {};
    url_names = []

    #Deal with adding city : raw_url to dictionary
    for i,v in enumerate(municipal_directory['items']):
        try:
            print("Reading in url from %s node, url: %s " % (v['name'],v['download']['url']))
            print("\n")
            url_names.append(v['name']);
            url_for_images.update({v['name']: v['download']['url']});
        except KeyError as e:
            print('KeyError on %s ' % e)

    #Take raw URLs to nodes, find index file, return array of image URLS
    image_urls, base_url,name = gi.parse_url(url_names[1], url_for_images[url_names[1]]);

    #save images to local repo
    pi.save_images(image_urls, base_url, name);



if  __name__ =='__main__':
    main()
