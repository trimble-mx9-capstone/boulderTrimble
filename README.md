# Municipal Object Detection 
Landon Baxter, Galen Pogoncheff, Robert Renecker, Chance Roberts 

## Overview
For our senior projects class, we worked with Trimble to create a system that uses machine learning to detect the presence of municipal objects within street imagery. The results of this object detection are then displayed on a web application deployed on Heroku. 

This README is meant to be a step-by-step "cookbook" that describes how to get the system up and running, and how each subsystem works. 

#### Contents
- [Obtaining and Submitting Images](#images)
  * [Obtaining images from Data Ocean](#obtain)
  * [Submitting to S3 Bucket for inference](#submit)
- [S3](#s3)
  * [Bucket hierarchy](#hierarchy) 
- [SageMaker](#sagemaker) 
  * [Accessing notebook instance](#accessnb)
  * [Running inference pipeline from notebooks](#inference)
- [Heroku](#heroku)
  * [Pushing builds to Heroku](#pushheroku)
  * [Viewing Heroku database contents](#dbheroku)
- [Setting up database locally](#database)
  * [Schema](#dbschema)
- [Local ExpressJS API Server](#server)  
  * [Installing dependencies for server](#backenddependencies)
  * [Starting server with necessary environment variables](#startserver)
- [Local React App](#react)  
  * [Installing dependencies for react app](#reactdependencies)
  * [Starting react dev server](#startreact)  


<a name="images"></a>
## Obtaining and Submitting Images  
This section discusses how we pulled images from the Data Ocean and uploaded them to the appropriate S3 bucket.    

<a name="obtain"></a>
### Obtaining images from Data Ocean  

<a name="submit"></a>
### Submitting to S3 Bucket for inference   


<a name="s3"></a>
## S3   
This section discusses how we designed the hierarchy of our S3 buckets and how they should be navigated.     

<a name="hierarchy"></a>
### Bucket hierarchy  
Our S3 buckets consisted of five major directories.  
- ```images```: The unlabeled images that will be passed through the inference pipeline. Scripts that migrate images of interest should insert their images into this directory.  
- ```images-preprocessed```: The unlabeled images after they have been passed through any preprocessing steps (orientation fixes, filename fixes, etc).  
- ```input```: The preprocessed images converted to JSON format. JSON is the format that our model expects.  
- ```output```: The output files of the inference. One output file per input file. Formatted in JSON. Each file contains a set of regions that may contain an object, the label of each region, and the confidence that each label is correct.   
- ```output-detections```: The images from ```images``` with bounding boxes drawn on them. These bounding boxes are defined by an image's output file in ```output```. These labeled images are then referenced by the website/webserver (which stores the URLs to each image in a database).   
