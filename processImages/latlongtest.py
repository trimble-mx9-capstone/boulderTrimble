from GPSPhoto import gpsphoto as gp

data = gp.getGPSData('images/Run01 - Coors Field0')


# Print out just GPS Data of interest
for tag in data.keys():
    print("%s: %s" % (tag, data[tag]))



#pip install gpsphoto
#pip install exifread
#pip install piexif
