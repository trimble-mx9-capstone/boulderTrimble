import argparse
from PIL import Image
from PIL import ExifTags
import os
import boto3

bucket = 'sagemaker-inference-testing'

s3 = boto3.client('s3')

parser = argparse.ArgumentParser(description="Pathway to folder you wish to upload")
parser.add_argument('-pathway', required=True, help="Resource Pathway")
args = parser.parse_args()
pathway = str(args.pathway)



for filename in os.listdir(pathway):

    try:
        s3.upload_file(pathway+filename, bucket, "images/"+filename)

    except Exception as e:
        print(e)
