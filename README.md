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
- [Setting up database locally](#database)
  * [Installing Postgres](#installpg) 
  * [Creating database and table](#createdb)
- [Local ExpressJS API Server](#server)  
  * [Installing dependencies for server](#backenddependencies)
  * [Starting server with necessary environment variables](#startserver)
- [Local React App](#react)  
  * [Installing dependencies for react app](#reactdependencies)
  * [Starting react dev server](#startreact)  
- [Heroku](#heroku)
  * [Pushing builds to Heroku](#pushheroku)
  * [Viewing Heroku database contents](#dbheroku)


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

<a name="database"></a>
## Setting up database locally  
In order to develop and test the application locally, you must create and run a PostgreSQL database. The following sections will describe how to create the database and the necessary table. 

<a name="installpg"></a>
### Installing PostgreSQL 
The following link will instruct you how to [install PostgreSQL](https://www.postgresql.org/download/). Please take note of any username or password that you configure in this step.  

Test that the installation worked by using the ```psql``` command to start the SQL shell. 

<a name="createdb"></a>
### Creating database and table
The following steps describe how to create the database and the table. Open the PostgreSQL shell by using the ```psql``` command.  
1. Create a database and use the ```\q``` command to quit the PostgreSQL shell.
~~~sql 
CREATE DATABASE capstone;
~~~  
2. In bash, start the SQL shell again, this time passing it the desired database: ```psql capstone``` 
3. Create the table with the following command.  
~~~sql 
CREATE TABLE images (
    id SERIAL,
    latitude numeric,
    longitude numeric,
    url character varying(150),
    has_stop_sign boolean,
    has_street_light boolean
); 
~~~ 
4. Once the table is created, try inserting into it with the following query: 
~~~sql 
INSERT INTO images(latitude, longitude, url, has_stop_sign, has_street_light) VALUES(-10.123, -12.001, 'img.example.com', false, true);
~~~ 
5. Verify that it worked: 
~~~sql 
SELECT * FROM images;
~~~ 

Once everything works, the database is ready for interaction with the development website. Make sure to remember the username/password (if any), as these will be needed to access the database from the development server. 
