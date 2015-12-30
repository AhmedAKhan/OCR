
fprintf('loading data . . . . . . . . . . . . . . .');
fflush(stdout);

load ThetaValues.mat
allData = csvread('../data/train.csv'); 	% load the data
allData(1, :) = [];				% remove the first row because it does not contain any data
fprintf('... done \n');

%testRatio 	= 0.1;
%cvRation  	= 0.1;
%allTestSize = ceil(size(allData, 1) * testRatio);
%allCVSize 	= ceil(size(allData, 1) * cvRation);

%randomValues = randperm(size(allData, 1));
%randomizedData = allData(randomValues, :);

allTestData  = allData; %randomizedData( 1:allTestSize, :);
%allCVData 	 = randomizedData( (allTestSize+1):(allCVSize+allTestSize), :);
%allTrainData = randomizedData( (allTestSize+allCVSize+1):end, :);

fprintf(' . . . done\n');
fprintf('running test . . . . . . . . . . . . . . .');
fflush(stdout);

yTest = allTestData(:, 1); % yTest = the actual value of the testData 
yTest = yTest + (yTest==0)*10;
YTest = ones(size(yTest, 1), 1) * (1:10) == yTest * ones(1, 10); % now Y is equal to what the nn should return

originalData = allTestData(:, 2:end);
testData = allTestData(:, 2:end)>100; %remove the results 

% start predicting
h1 = sigmoid([ones(size(testData, 1), 1) testData] * Theta1');
h2 = sigmoid([ones(size(testData, 1), 1) h1] * Theta2');
[dummy, p] = max(h2, [], 2);
% done predicting 

fprintf(' . . . done\n');
fprintf('Training Set Accuracy: %f\n', mean(double(p == yTest)) * 100);
fprintf('display images. . . . . . . . . . . . . . .');
fflush(stdout);

wrongTests = ((p != yTest) .* yTest);
wrongTests = [ (1:size(wrongTests, 1))', wrongTests];
wrongTests(wrongTests(:,2)==0, :) = [];

wrongTestsPredicted = ((p != yTest) .* p);
wrongTestsPredicted = [ (1:size(wrongTestsPredicted, 1))', wrongTestsPredicted];
wrongTestsPredicted(wrongTestsPredicted(:,2)==0, :) = [];

wrongImages = testData(wrongTests(:, 1), :);
wrongImagesWithIndex = [wrongTests(:, 1), wrongImages];

widthOfImage = 28;
heightofImage = 28;
pad = 1;
numberOfImages = 6;

display_array = 255*ones((widthOfImage+pad)*numberOfImages, (heightofImage+pad)*numberOfImages); 
curr_ex = 1;
reshapedFalseResults = zeros(numberOfImages, numberOfImages);
reshapedTrueResults  = zeros(numberOfImages, numberOfImages);
fprintf('\n');

for i = 1:numberOfImages
	for j = 1:numberOfImages

		if curr_ex > size(wrongTests, 1), break; end

		display_array(pad + (i - 1) * (heightofImage + pad) + (1:heightofImage), ...
		              pad + (j - 1) * (widthOfImage + pad) + (1:widthOfImage)) = ...
							reshape(originalData( wrongTests(curr_ex, 1), :), heightofImage, widthOfImage);

		reshapedFalseResults(i, j) = wrongTests(curr_ex, 2);
		reshapedTrueResults(i, j)  = wrongTestsPredicted(curr_ex, 2);
		curr_ex = curr_ex + 1;
	end
end

colormap(gray);
imagesc(flipud(-display_array), [-255, 0]);

fprintf(' . . . done\n');

fprintf('the results are as follows');
reshapedTrueResults
reshapedFalseResults

