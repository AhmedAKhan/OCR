# import the necessary libraries
# import input_data
import tensorflow as tf
import numpy as np
import sys; # to get the command line argument

# start the session
sess = tf.InteractiveSession();

# make the input and output tensors
x = tf.placeholder("float", shape=[None, 784]);
y_ = tf.placeholder("float", shape=[None, 10]);


# initialize positive weights with small noise
def weight_variable(shape):
    initial = tf.truncated_normal(shape, stddev=0.1);
    return tf.Variable(initial);

# initialize positive bias
def bias_variable(shape):
    initial = tf.constant(0.1, shape=shape);
    return tf.Variable(initial);



def conv2d(x, W):
    return tf.nn.conv2d(x, W, strides=[1,1,1,1], padding='SAME');

def max_pool_2x2(x):
    return tf.nn.max_pool(x, ksize=[1,2,2,1], strides=[1,2,2,1], padding='SAME');



"""
  this is the wieght and bias of the first layer of the convolution neural network.
  The first two dimensions are the patch size, the next is the number of input channels and the last is the number of output channels.
"""
W_conv1 = weight_variable([5,5,1,32]);
b_conv1 = bias_variable([32]);

### reshape the current tensor to a 4d tensor. with the second and third dimensions corresponding to image width and height, and the final dimension corresponding to the number of color channels
x_image = tf.reshape(x, [-1,28,28,1])


h_conv1 = tf.nn.relu(conv2d(x_image, W_conv1) + b_conv1);
h_pool1 = max_pool_2x2(h_conv1);




#### Second convolution layer

## the weights and bias of another convolution layer, with 5 by 5, with input size of 32, and output of 64
W_conv2 = weight_variable([5,5,32,64]);
b_conv2 = bias_variable([64]);


##
h_conv2 = tf.nn.relu(conv2d(h_pool1, W_conv2) + b_conv2);
h_pool2 = max_pool_2x2(h_conv2);


##
W_fc1 = weight_variable([7 * 7 * 64, 1024]);
b_fc1 = bias_variable([1024]);

h_pool2_flat = tf.reshape(h_pool2, [-1, 7*7*64]);
h_fc1 = tf.nn.relu(tf.matmul(h_pool2_flat, W_fc1) + b_fc1);

#### DROPOUTS
keep_prob = tf.placeholder("float");
h_fcl_drop = tf.nn.dropout(h_fc1, keep_prob);


### add the softmax layer
w_fc2 = weight_variable([1024, 10]);
b_fc2 = bias_variable([10]);



### get the correct y concv
W_fc2 = weight_variable([1024, 10])
b_fc2 = bias_variable([10])

y_conv=tf.nn.softmax(tf.matmul(h_fcl_drop, W_fc2) + b_fc2)

## make the saver
saver = tf.train.Saver()


######  train
def train():
  # load the data
  mnist = input_data.read_data_sets('MNIST_data', one_hot=True);

  cross_entropy = -tf.reduce_sum(y_*tf.log(y_conv))
  train_step = tf.train.AdamOptimizer(1e-4).minimize(cross_entropy)
  correct_prediction = tf.equal(tf.argmax(y_conv,1), tf.argmax(y_,1))
  accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))
  sess.run(tf.initialize_all_variables())
  for i in range(20000):
    batch = mnist.train.next_batch(50)
    if i%100 == 0:
      train_accuracy = accuracy.eval(feed_dict={
          x:batch[0], y_: batch[1], keep_prob: 1.0})
      print("step %d, training accuracy %g"%(i, train_accuracy))
    train_step.run(feed_dict={x: batch[0], y_: batch[1], keep_prob: 0.5})

  print("test accuracy %g"%accuracy.eval(feed_dict={
      x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))

  print("going to save the session");
  save_path = saver.save(sess, "/tmp/model.ckpt")
  print("Model saved in file: %s" % save_path)

def restore():
  print("starting to restore the data ");
  saver.restore(sess, "./modelSaveData.ckpt");
  # saver.restore(sess, "/tmp/model.ckpt")
  print("Model restored.")

def runSomeCase():
  #### take the data
  mnist = input_data.read_data_sets('MNIST_data', one_hot=True);

  print("starting to restore the data ");
  saver.restore(sess, "/tmp/model.ckpt")
  print("Model restored.")

  print("getting values");
  resultVars = y_conv.eval(feed_dict={x:mnist.test.images[0].reshape(1,784), keep_prob:1.0});
  result = tf.argmax(resultVars,1)
  print (result);

def runCase(image):
  restore(); ## restore the last session
  print("getting values");
  resultVars = y_conv.eval(feed_dict={x:image, keep_prob:1.0}); # run the neural network with the image, and get the result vector
  result = tf.argmax(resultVars,1); # get the max value and make that the prediction
  print (result); # print the result
  return result; # and then return it

def parseInput(stringInput):
  arr = np.zeros((1,784))
  # defaultArr = np.full((1,784), 0);
  index = 0;
  for index in range(0,784):
    arr[0, index] = stringInput[index];
  return arr;

def main():
  print("starting main function");
  if(len(sys.argv) <= 1):
    print("Please enter an argument, either train or restore");
    return;
  elif (sys.argv[1] == 'train'): train();
  elif (sys.argv[1] == 'restore'): restore();
  elif (sys.argv[1] == 'runCase'): runCase(parseInput(sys.argv[2]));
  print("done");


if __name__ == '__main__':
  main();



"""
  ## sample of how to run this code
  python3 convnet.py runCase '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
"""

