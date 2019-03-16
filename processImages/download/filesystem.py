#Filesystem is parent to sub-children File and Directory.

#Incorporated Factory Method to create either of those subclasses.

import urllib.request as urllib

import authentication as auth

import handle_directories as hd

import get_images as gi

import process_images as pi

class Filesystem():
    name = None
    id = None
    path = None
    parent = None

    def collectImages(self, host, b_token):

        print("Collect Images for this filesystem type is not implemented or this \
        file type is too abstract to contain image files. Please choose a sub-directory to use this function.")



#Sub Child : FILE

class File(Filesystem):
    name = None
    id = None
    path = None

    def __init__(self, name, id, path, parent=None):
        self.name = name
        self.id = id
        self.path = path
        self.parent = parent


    def getName(self):
        return self.name

    def explainSelf(self):
        print("\n\nContents of directory:\n")
        print("%s Directory Name: %s"% (' ',self.name))
        print("%s Directory ID: %s"% (' ',self.id))
        print("%s Directory Path: %s"% (' ',self.path))
        print("%s Directory Parent: %s"% (' ',self.parent))

    def listChildren(self, host, b_token):
         #Get URLS from node
         print("\nNo children files, this is a FILE\n")

    def collectImages(self, host, b_token):
        #Add feature to either pull just this FILE object images or all of them from the parent
        print("Collecting Images")

        #Get parent directory so that you can pull it's contents of the specific child.
        parent_directory = hd.get_directory_by_id(host, self.parent, b_token);

        file_download_urls=[]
        for i,v in enumerate(parent_directory['items']):
            try:
                name_of_child = v['name']
                if ( name_of_child == self.name ):
                    file_download_urls.append(v['download']['url'])

            except KeyError as e:
                print('KeyError on %s ' % e)




        #Get's URL's of images that this specific child contains
        image_urls = gi.parse_url(self.name, file_download_urls[0]);

        #save images to local repo
        number_of_images_to_retrieve = int(input("How many images would you like retrieved?"))
        pi.save_images(image_urls, file_download_urls[0], self.name, number_of_images_to_retrieve);



#Sub Child : DIRECTORY

class Directory(Filesystem):
    name = None
    id = None
    path = None

    def __init__(self, name, id, path, parent=None):
        self.name = name
        self.id = id
        self.path = path
        self.parent = parent

    def getName(self):
        return self.name

    def explainSelf(self):
        print("Contents of directory:\n")
        print("%s Directory Name: %s"% (' ',self.name))
        print("%s Directory ID: %s"% (' ',self.id))
        print("%s Directory Path: %s"% (' ',self.path))
        print("%s Directory Parent: %s"% (' ',self.parent))

    def listChildren(self, host, b_token):
        #retrieve children directories
        children_dirs = hd.get_directory_by_id(host, self.id, b_token)


        #List their names
        temp_child_directory = None
        object_list = []

        for i,child in enumerate(children_dirs['items']):
            temp_child_directory = create_file_object(child)
            object_list.append(temp_child_directory)
            print("\n\nDirectory %i" % i)
            print(temp_child_directory.explainSelf())

        while True:
            ans = input("Move to Directory: \n ? (y\\n):")

            if ans == 'y':
                ans = input("Which? (Enter #): ")
                return object_list[int(ans)]
            elif ans == 'n':
                return None
            print("\nInvalid Option\n")




#Factory For Filesystem Class Structures
class filesystemFactory():
    name = None
    id = None
    path = None
    parent = None


    def __init__(self, name, id, path,parent=None):
        self.name = name
        self.id = id
        self.path = path
        self.parent = parent


    def makeFilesystemObject(self, fileType):
        if fileType == 'DIRECTORY':
            return Directory(self.name, self.id, self.path, self.parent)
        if fileType == 'FILE':
            return File(self.name, self.id, self.path, self.parent)


#Helper function to use Factory Class
def create_file_object(dir_object):
    #
    temp_dir = dir_object
    temp_obj = filesystemFactory(temp_dir['name'], temp_dir['id'], temp_dir['path'], temp_dir['parent_id'])
    temp_obj = temp_obj.makeFilesystemObject(temp_dir['type'])
    return temp_obj
