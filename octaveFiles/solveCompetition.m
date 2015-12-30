
allData = csvread('../data/test.csv'); 	% load the data
load('../data/ThetaValues.txt')			% load the theta values

fprintf('started testing ..........................');
fflush(stdout);

allData = allData(2:end, :);
testData = allData>100; %remove the results 

% start predicting
h1 = sigmoid([ones(size(testData, 1), 1) testData] * Theta1');
h2 = sigmoid([ones(size(testData, 1), 1) h1] * Theta2');
[dummy, p] = max(h2, [], 2);

p = (p != 10) .* p; % this makes it so that it converts all the 10's to 0

save results.txt p;

% done predicting 
fprintf('... done\n');

fflush(stdout);





