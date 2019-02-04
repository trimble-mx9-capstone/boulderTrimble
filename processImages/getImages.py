import urllib.request as urllib

def parse_url(name, url):
    #array of image-url's to be returned
    url_array = []
    #replace the {path} with index.txt to retrieve file with URLs
    index_file = url.replace('{path}', name+"/index.txt")

    data = urllib.urlopen(index_file);

    for line in data:
        url_array.append(line.decode("utf-8"));
    #I dont think we need csv location & trajectory files as of yet
    url_array = url_array[2:]

    return url_array, index_file, name;



