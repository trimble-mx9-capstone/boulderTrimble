import numpy as np
import pandas as pd
import requests
import json
import sys

import authentication as auth

import handle_directories as hd

import get_images as gi

import process_images as pi


#External Classes
from filesystem import Filesystem, File, Directory ,filesystemFactory, create_file_object



def main():
    """
        # Create a file named authentication.txt and in the first 3 lines input the variables:
        # host_identity
        # host
        # tid_token
    """
    #Read in those values
    content = None
    try:
        with open("authentication.txt") as f:
            content = f.readlines()
        content = [x.strip() for x in content]

    except:
        print("\nError: No authentiction file. Please make one and append user-associated tokens to it.\n")
        exit(0)

    host_identity = content[0];
    host = content[1]

    tid_token = content[2]

    """
        Request authentication is handled via TPaaS TID.
        The TID authentication token should be included in the header when connecting to Data Ocean.
    """
    b_token = auth.init_bearer_token(host_identity, tid_token)

    #Get top level of tree (our parent CU-Capstone-Node)
    parent_pagnated_node = hd.get_directory_name(host, str(b_token));

    current_directory = parent_pagnated_node['items'][0]
    root_directory = filesystemFactory(current_directory['name'], current_directory['id'], current_directory['path'])
    root_directory = root_directory.makeFilesystemObject(current_directory['type'])
    current_directory = root_directory


    while True:

        print("Please choose:")
        print("1. Display Current Directory")
        print("2. List Files / Move to a Sub-Directory")
        print("3. Collect Images From Current Directory")
        print("4. Exit")



        #1 is display current

        #2 is list and then move down to sub-directory if chosen

        #3 is collect images from current directory
        try:
            client_choice = int(input("Enter 1, 2, 3 or 4\n"))
            if client_choice in [1,2,3,4]:
                if client_choice == 1:
                    current_directory.explainSelf()
                    pass
                elif client_choice == 2:
                    temp = current_directory.listChildren(host, b_token)
                    if temp:
                        current_directory = temp

                elif client_choice == 3:
                    current_directory.collectImages(host, b_token)
                else:
                    break



        except ValueError:
            print("Invalid Input: Value Error\n")
        except: print("Invalid Input\n")




if  __name__ =='__main__':
    main()
    sys.exit()
