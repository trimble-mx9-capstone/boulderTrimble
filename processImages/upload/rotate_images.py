import argparse
import os
from PIL import Image
from PIL import ExifTags
import piexif


def main():
    parser = argparse.ArgumentParser(description='Pathway to folder containing images; core task: rotate images')
    parser.add_argument('-pathway', required=True, help="pathway")
    #Command line argument should be path to folder
    args = parser.parse_args()
    path = str(args.pathway)

    #Loop through image files in the folder given
    for filename in os.listdir(path):
        """
            - For every file, create a dictionary where our target key will be the orientation.
            - Get the (key value) pair of exifdata from each imageself.
            - If the orientation is flipped (3,6,9); rotate to upright position = 1.
            - Save to the same filepath that the image was retrieved from.
        """
        exifData = {}
        try:
            image = Image.open(path+filename)

            exif_dict = piexif.load(image.info['exif'])
            #new_exif = adjust_exif(exif_dict)

            if piexif.ImageIFD.Orientation in exif_dict["0th"]:
                print("Orientation is ", exif_dict["0th"][piexif.ImageIFD.Orientation])

            #exif_bytes = piexif.dump(new_exif)
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation]=='Orientation':
                    break
            exif=dict(image._getexif().items())

            if exif[orientation] == 3:
                image=image.rotate(180, expand=True)
            elif exif[orientation] == 6:
                image=image.rotate(270, expand=True)
            elif exif[orientation] == 8:
                image=image.rotate(90, expand=True)

            exif_dict["0th"][piexif.ImageIFD.Orientation] = 1
            exif_bytes = piexif.dump(exif_dict)








            image.save(path+filename, "JPEG", exif=exif_bytes)
            image.close()


        except (AttributeError, KeyError, IndexError) as e:
        # cases: image don't have getexif
            print(e)
            pass
        except Exception as e:
            print(e)
            pass


if __name__ == '__main__':
    main()
