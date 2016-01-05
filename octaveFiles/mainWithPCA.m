%this script should use pca to make the program run faster
% When the iteration is 500, the Accuracy is 97.476190 when the nodes in the hidden layer is 150
fprintf('loading the training data ................');
fflush(stdout); 

allData = csvread('../data/train.csv'); 	% load the data
allData(1, :) = [];				% remove the first row because it does not contain any data
fprintf('... done \n');

fprintf('splitting the data into train and test ...');
fflush(stdout); 

testRatio 	= 0.1;
cvRatio  	= 0.1;
allTestSize = ceil(size(allData, 1) * testRatio);
allCVSize 	= ceil(size(allData, 1) * cvRatio);

randomValues = randperm(size(allData, 1));
randomizedData = allData(randomValues, :);

allTestData  = randomizedData( 1:allTestSize, :);
allCVData    = randomizedData( (allTestSize+1):(allCVSize+allTestSize), :);
allTrainData = randomizedData( (allTestSize+allCVSize+1):end, :);

fprintf('... done \n');
fprintf('parsing the data to make actual output....');
fflush(stdout);

%get the results
y = allTrainData(:, 1); % y = the actual value of the trainData 
y = y + (y==0)*10;
Y = ones(size(y, 1), 1) * (1:10) == y * ones(1, 10); % now Y is equal to what the nn should return

fprintf('... done \n');
fprintf('parsing the data to get the inputs........')
fflush(stdout);

K = 268; 	 % this number is gotten from the findBestKValue script
trainData = allTrainData(:, 2:end);
[U, S] = pca(trainData);
trainingData_pca = projectData(trainData, U, K);

trainingData_pca = trainingData_pca>100; %remove the results 
% now the train data is a matrix where each row represents the input to the nn and there are m samples inputs

fprintf('... done\n');
fprintf('declaring variables.......................');
fflush(stdout);

input_layer_size  = K;		% 784;
hidden_layer_size = 150; 
output_layer_size = 10; 

fprintf('... done\n');

fprintf('input_layer_size nodes: %d \n', input_layer_size);

fprintf('Initializing Neural Network Parameters ...');
fflush(stdout);

initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);
initial_Theta2 = randInitializeWeights(hidden_layer_size, output_layer_size);

% Unroll parameters
initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];

fprintf('... done\n');





fprintf('started Pre-process data...................');
fflush(stdout);

fprintf('......... done \n');
fflush(stdout);




fprintf('Training Neural Network...................');
fflush(stdout);

%  After you have completed the assignment, change the MaxIter to a larger
%  value to see how more training helps.
options = optimset('MaxIter', 500);

%  You should also try different values of lambda
lambda = 1;

% Create "short hand" for the cost function to be minimized
costFunction = @(p) nnCostFunction(p, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   output_layer_size, trainingData_pca, y, lambda);

% Now, costFunction is a function that takes in only one argument (the
% neural network parameters)
[nn_params, cost] = fmincg(costFunction, initial_nn_params, options);

Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                 hidden_layer_size, (input_layer_size + 1));

Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                 output_layer_size, (hidden_layer_size + 1));

fprintf('... done\n');

fprintf('started testing ..........................');
fflush(stdout);

yTest = allTestData(:, 1); % yTest = the actual value of the testData 
yTest = yTest + (yTest==0)*10;
YTest = ones(size(yTest, 1), 1) * (1:10) == yTest * ones(1, 10); % now Y is equal to what the nn should return

%K = 268; 	 % this number is gotten from the findBestKValue script
testData = allTestData(:, 2:end);
[U, S] = pca(testData);
testData_pca = projectData(testData, U, K);

testData_pca = testData_pca>100; %remove the results 

% start predicting
h1 = sigmoid([ones(size(testData_pca, 1), 1) testData_pca] * Theta1');
h2 = sigmoid([ones(size(testData_pca, 1), 1) h1] * Theta2');
[dummy, p] = max(h2, [], 2);

% done predicting 
fprintf('... done');
fprintf('Training Set Accuracy: %f\n', mean(double(p == yTest)) * 100);
fflush(stdout);


