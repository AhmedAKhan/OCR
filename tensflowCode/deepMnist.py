# import the necessary libraries
import input_data
import tensorflow as tf
import numpy as np

sess = tf.InteractiveSession();

# load the
mnist = input_data.read_data_sets('MNIST_data', one_hot=True);

"""
### here both x and y_ are not values but just placeholders, for when the session runs the inputs will be given

this is the input and output for the image class
here the x is a 2d tensor of floating point numbers
here we assign it a shape of [none, 784].
      where 784 =  is the dimensionality of a single flattened mnist image.
      none = indicates that the first dimension, coressponds to the batch size, can be of any size.

y is the same thing with a dimensionality of 10, which repesenents the output digit.

"""
x = tf.placeholder("float", shape=[None, 784]);
y_ = tf.placeholder("float", shape=[None, 10]);



"""
  W = represents the weights of the neural network
  b = represents the biases of the neural network

  variable = in tensorflow the variables that the session needs to modify shouldbe a variable
"""
W = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))


"""
  before variables can be used in a session they need to be assigned.
"""
sess.run(tf.initialize_all_variables());



"""
    predict class and cost function,
    In this case the cost function is the cross-entropy between the target and the model's prediction.
"""
y = tf.nn.softmax(tf.matmul(x,W) + b);          # compute the result
cross_entropy = -tf.reduce_sum(y_*tf.log(y));   # compute the cost function



# now train the tensor flow
#### all the built in optimization algorithms --> https://www.tensorflow.org/versions/master/api_docs/python/train.html#optimizers
## tell the model to start training.
train_step = tf.train.GradientDescentOptimizer(0.01).minimize(cross_entropy)

"""
    The returned operation train_step, when run, will apply the gradient descent updates to the parameters. Training the model can therefore be accomplished by repeatedly running train_step.
"""
for i in range(1000):
  batch = mnist.train.next_batch(50) ## does minibatch with 50 in each batch
  train_step.run(feed_dict={x: batch[0], y_: batch[1]}) ## runs the train_step with the given values. Where the values come from feed dictionary and x and y_ are adjusted accordingly

##### with feed_dict you can change any tensor in your application, not just const

## find the number of correct predictions, tf.argmax(), finds the highest entry in the tensor along some axis, since y is correct result, and y_ is the predicted result, when the two values are the same, the program made the correct predicition
## returns a list of booleans, need to get a percentage
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))

accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"));

print(accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels}));







