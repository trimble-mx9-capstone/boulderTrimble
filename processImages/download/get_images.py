import requests

def parse_url(name, url):
    #array of image-url's to be returned
    jpg_image_url_array = []
    #replace the {path} with index.txt to retrieve file with URLs
    index_file = str(url.replace('{path}', name+"/index.txt"))


    data = requests.get(index_file)
    try:
        for line in data.text.splitlines():
            jpg_image_url_array.append(line)
    except:
        print("Couldn't open file for URLS")
        return



    return jpg_image_url_array
