import urllib.request as urllib

def save_images(image_urls,base_url, name):
    base_url = base_url.replace(name+'/index.txt', '{path}')
    for i,url in enumerate(image_urls):
        temp = url.split()
        url_to_find = base_url.replace('{path}', temp[0]+'%20'+temp[1]+'%20%20'+temp[2]+'%20'+temp[3])
        urllib.urlretrieve(url_to_find, "images/municipal_image_"+str(i)+".jpg")
        print("getting image number :%f" % i)
        if (i>500):
            break;
