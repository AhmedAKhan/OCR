'''
This file will take in the input data and increase it, meaning, rotate it, scale it, bold and unbold the picture and will output the result in a file called trainDataIncreased.csv
that data will be trained in the neural network.

'''

import numpy as np;
import cv2;
import csv;

filename = 'train.csv';
#fileReader = open('train.csv', 'r');
fileWriter = open('trainDataIncreased.csv', 'w');
widthOfImages = 28;
heightOfImages = 28;

def saveToFile(curInput):
  fileWriter.write(curInput+'\n');

# # save this inputs to the file
# def saveToFile():
  # print ("save to file started");
  # fileWriter = open('trainDataIncreased.csv', 'w');
  # fileWriter.write('0,0,0,0,000,0,0,0\n');
  # fileWriter.write('0,0,0,0,000,0,0,0\n');
  # fileWriter.close();
  # print ("save to file ended");


# start rotating the image
def rotateImage():
  print("rotate image function not yet implimented");# TODO

def scaleImage():
  return;# TODO


#-------------------------------------------- start out thinning and bolding the text --------------------------------------------------------
def inBounds(x,y):
  return (x >= 0 and x < widthOfImages and y >= 0 and y < heightOfImages);
'''
  @param curImage = the image stored as an array of integers
  @param x = x position of current pixel
  @param y = y position of current pixel
  return = the number of neighbors that the current pixel has
'''
def numberOfOnneighbors(curImage, x, y):
  neigbors = 0;
  print('x: ' + str(x) + ' y: ' + str(y) + ' currentCellValue: ' + str(curImage[x*widthOfImages+y]));
  if(inBounds(x-1,y)): neigbors += curImage[(x-1) * widthOfImages + (y)];     # left
  if(inBounds(x-1,y-1)): neigbors += curImage[(x-1) * widthOfImages + (y-1)]; # left top
  if(inBounds(x,y-1)): neigbors += curImage[(x) * widthOfImages + (y-1)];     # top
  if(inBounds(x+1,y-1)): neigbors += curImage[(x+1) * widthOfImages + (y-1)]; # top right
  if(inBounds(x+1,y)): neigbors += curImage[(x+1) * widthOfImages + (y)];     # right
  if(inBounds(x+1,y+1)): neigbors += curImage[(x+1) * widthOfImages + (y+1)]; # right bottom
  if(inBounds(x,y+1)): neigbors += curImage[(x) * widthOfImages + (y+1)];     # bottom
  if(inBounds(x-1,y+1)): neigbors += curImage[(x-1) * widthOfImages + (y+1)]; # left bottom
  return neigbors;

def boldImage(curImage):
  # TODO
  return;
'''
  @param curImage = an array of integers ,representing the color of the pixel, where integer 0 is black and 255 is white. there are 28*28 pixels.
  shows in this manor, where the number represents the index in the array, and the position represents the position on the screen.
  [
  1 2 3 4 5 .... 28,
  29 30 31 .... 56,
  ....
  ]
'''
def thinOut(curImage):
  print('going to call number of neightbors on row 1, for the pixel 0, 0 resut = ' + str(numberOfOnneighbors(curImage, 1,1)) + ' pixel value at position is ' + str(curImage[1]));
  print('going to call number of neightbors on row 1, for the pixel 20, 10 result = ' + str(numberOfOnneighbors(curImage, 20,10)));
  print('going to call number of neightbors on row 1, for the pixel 10, 20 result = ' + str(numberOfOnneighbors(curImage, 10,20)));
  # print('going to call number of neightbors on row 1, for the pixel 10, 30 result = ' + str(numberOfOnneighbors(curImage, 10,30)));
  # print('going to call number of neightbors on row 1, for the pixel 40, 40 result = ' + str(numberOfOnneighbors(curImage, 40,40)));
  return ;


#-------------------------------------------- end of thinning and bolding the text --------------------------------------------------------




def addMorePhotos(curImage):
  thinOut(curImage);
  return ;

# start creating more inputs
def main():
  print ("starting main");
  print ('reading file ...');
  ## start reading the file
  lines = [line.rstrip('\n') for line in open(filename)]
  saveToFile(lines[0]);
  lines.pop(0);
  print ('... done loading file');

  print('going to increase the input data with this first photo');
  # loop through the pictures, add add more
  numberOfRows = 0;
  maxRows = 0;
  for row in lines:
    print ('numberOfRows: ' + str(numberOfRows) + ' doing row ' + row);
    saveToFile(row);
    parsedRow = [int(numeric_string) for numeric_string in row.split(',')];
    addMorePhotos(parsedRow);
    numberOfRows = numberOfRows + 1;
    if(numberOfRows >= maxRows): break;
  fileWriter.close();
  print ('done everything');




if __name__ == "__main__":
  print ("inside the if statement");
  main();


