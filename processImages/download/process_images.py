import urllib.request as urllib
import requests
import shutil
import os
import boto3


def save_images(image_urls,base_url, name, number_to_return):


    bucket = 'sagemaker-inference-data'

    s3 = boto3.client('s3')



    current_dir = os.getcwd()
    #This makes it easier to just get the file saved as whatever comes before any / in the filename -- because it will
    #be interpreted as a folder otherwise.
    save_image_path = os.path.join(current_dir,"images",image_urls[0].split('/')[0])


    for i,url in enumerate(image_urls):
        if (i >= number_to_return):
            break;

        try:
            url_to_find = str(base_url.replace('{path}', url))

            image = requests.get(url_to_find, stream=True)
            print("getting image number :%f" % i)

            #If images directory from cwd doesn't exist already, create it.
            if not os.path.exists(os.path.join(current_dir,"images")):
                os.makedirs(os.path.join(current_dir,"images"))

            #Save Image
            local_image_path = save_image_path+str(i)+".jpeg"
            with open(local_image_path, "wb+") as out_file:
                shutil.copyfileobj(image.raw, out_file)


        except:
            print("Error in retrieving image.")
        #s3.upload_file(local_image_path, bucket, "images/"+str(image_urls[0].split('/')[0]+str(i)+".jpeg") )
