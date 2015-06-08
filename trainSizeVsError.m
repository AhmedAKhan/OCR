
fprintf('loading the training data ................');
fflush(stdout); 

allData = csvread('train.csv'); 	% load the data
allData(1, :) = [];				% remove the first row because it does not contain any data
fprintf('... done \n');

fprintf('splitting the data into train and test ...');
fflush(stdout); 

%declare constants so it would be easier to change these values instead of going around the code and changing random constant values
testRatio 	= 0.1;
cvRation  	= 0.1;
allTestSize = ceil(size(allData, 1) * testRatio);
allCVSize 	= ceil(size(allData, 1) * cvRation);

%randomize the data set because maybe there is some order in the data set that may make the training set or a certain category of data which will skew our results
randomValues = randperm(size(allData, 1));
randomizedData = allData(randomValues, :);

%split the data into 3 distinct groups such as test, cross validation, and train
allTestData  = randomizedData( 1:allTestSize, :);
allCVData 	 = randomizedData( (allTestSize+1):(allCVSize+allTestSize), :);
allTrainData = randomizedData( (allTestSize+allCVSize+1):end, :);

% info for cross validation
yCV = allCVData(:, 1); 		% yCV = the actual value of the CVData %get the expected output
yCV = yCV + (yCV==0)*10;	% convert the 0 to 10s	
CVData = allCVData(:, 2:end)>100; %remove the results  % holds all the cross validation data

%info for test
yTest = allTestData(:, 1);
yTest = yTest + (yTest==0)*10;
testData = allTestData(:, 2:end);

fprintf('... done \n');
fprintf('parsing the data to make actual output....');
fflush(stdout);

%info for train
ytrain = allTrainData(:, 1); % ytrain = the actual value of the trainData
ytrain = ytrain + (ytrain==0)*10;
Ytrain = ones(size(ytrain, 1), 1) * (1:10) == ytrain * ones(1, 10); % now Ytrain is equal to what the nn should return

fprintf('... done \n');
fprintf('parsing the data to get the inputs........')
fflush(stdout);

trainData = allTrainData(:, 2:end)>100; %remove the results 
% now the train data is a matrix where each row represents the input to the nn and there are m samples inputs

fprintf('... done\n');
fprintf('declaring variables.......................');
fflush(stdout);

input_layer_size  = 784;
hidden_layer_size = 150; 
output_layer_size = 10; 

fprintf('... done\n');

fprintf('Starting to train network................... \n');
fflush(stdout);

%  After you have completed the assignment, change the MaxIter to a larger
%  value to see how more training helps.
options = optimset('MaxIter', 50);

%  You should also try different values of lambda
lambda = 1;

% Create "short hand" for the cost function to be minimized
costFunction = @(p, trainingSize) nnCostFunction(p, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   output_layer_size, trainData, ytrain, lambda);

%iniatlize the arrays 
JCV = [];
Jtrain = [];

%xAxis = [1,2];
%for trainingSize = xAxis
%	initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size); 
%	initial_Theta2 = randInitializeWeights(hidden_layer_size, output_layer_size);
%	initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];
%	[nn_params, cost] = fmincg(@(p)(costFunction(p, trainingSize)), initial_nn_params, options);
%
%	Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), hidden_layer_size, (input_layer_size + 1));
%	Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), output_layer_size, (hidden_layer_size + 1));
%
%	JCV = [JCV; nnCostWithoutGrad([Theta1(:); Theta2(:)], input_layer_size, hidden_layer_size, output_layer_size, CVData, yCV, lambda)];
%	Jtrain = [ Jtrain; nnCostWithoutGrad([Theta1(:); Theta2(:)], input_layer_size, hidden_layer_size, output_layer_size, trainData, ytrain, lambda)];
%end


xAxis = 1:336:size(trainData,1);
for trainingSize = xAxis
 	fprintf('\tStarted training network for a training size of %i \n\t', trainingSize)

	initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size); 	% initializing theta 1 to random values
	initial_Theta2 = randInitializeWeights(hidden_layer_size, output_layer_size);	% initializing theta 2 to random values

	initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)]; 					% Unroll parameters

	% Now, costFunction is a function that takes in only one argument (the neural network parameters)
	[nn_params, cost] = fmincg(@(p)(costFunction(p, trainingSize)), initial_nn_params, options);

	% putting the Theta1 and Theta 2 back in there shape
	Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), hidden_layer_size, (input_layer_size + 1));
	Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), output_layer_size, (hidden_layer_size + 1));
	
	fprintf('\tgetting the cost ..........................');
	fflush(stdout);
	
	JCV = [JCV; nnCostWithoutGrad([Theta1(:); Theta2(:)], input_layer_size, hidden_layer_size, output_layer_size, CVData, yCV, lambda)];
	Jtrain = [ Jtrain; nnCostWithoutGrad([Theta1(:); Theta2(:)], input_layer_size, hidden_layer_size, output_layer_size, trainData, ytrain, lambda)];
	
	fprintf('... done\n');
	fflush(stdout);
end

fprintf('done getting JCV values and Jtrain \n');

fprintf('starting to draw graph ...................');
fflush(stdout);

plot(xAxis, [JCV, Jtrain]);
title('hidden layer nodes vs error of JCV and JTrain');
legend('J cross validation', 'J train')
xlabel('number of nodes in hidden layer');
ylabel('cost or error');

fprintf('...done drawing graph\n');

