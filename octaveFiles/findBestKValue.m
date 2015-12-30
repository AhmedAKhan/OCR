%function K = findBestKValue(data)
  allData = csvread('../data/train.csv');
  allData(1, :) = []; 

  testRatio   = 0.1;
  cvRatio   = 0.1;
  allTestSize = ceil(size(allData, 1) * testRatio);
  allCVSize   = ceil(size(allData, 1) * cvRatio);
  
  randomValues = randperm(size(allData, 1));
  randomizedData = allData(randomValues, :);
  
  allTestData  = randomizedData( 1:allTestSize, :);
  allCVData    = randomizedData( (allTestSize+1):(allCVSize+allTestSize), :);
  allTrainData = randomizedData( (allTestSize+allCVSize+1):end, :);

  X = allTestData(:, 2:end);
   
  %did not need to scale this dataset because it has the exact same scale and same range of values
  X_norm = X;

  %get the U and S, U contains the vectors for the new basis
  [U, S] = pca(X);
 
  fprintf('starting the loop\n');
  fflush(stdout); 

  %K = size(data, 2) -1;
  %while true 
  %  %projected data
  %  Z = projectData(X_norm, U, K);

  %  %recover data
  %  X_rec  = recoverData(Z, U, K);
  %  
  %  %get error
  %  currentError = sum(sum((X-X_rec) .^2)) / sum(sum(X .^ 2)); 
  %  
  %  fprintf('ran for a k value of %f with an error of %f\n', K, currentError);
  %  fflush(stdout);
  %  %if the error is greater then one percent, just break out of it, if not try running the next k value
  %  if currentError > 0.01
  %    break;
  %  end

  %  K = K - 1;
  %end


    
  
  
  

  K = size(X_norm, 2) -1;
  max = size(X_norm, 2);
  min = 1;
  while (max - min > 1)
    
    K = ceil((max+min)/2);
    
    %projected data
    Z = projectData(X_norm, U, K);

    %recover data
    X_rec  = recoverData(Z, U, K);
    
    %get error
    currentError = sum(sum((X-X_rec) .^2)) / sum(sum(X .^ 2)); 
    
    fprintf('ran for a k value of %f with an error of %f  max: %f  min:%f \n', K, currentError, max, min);
    fflush(stdout);
    %if the error is greater then one percent, just break out of it, if not try running the next k value
    if currentError > 0.01
      min = K;
    else 
      max = K;
    end
  end
 
  fprintf('the final value of k is %d with an error of %f min:%f max:%f\n', K, currentError, min, max);
  fprintf('the final value of k is %f with an error of %f min:%f max:%f\n', K, currentError, min, max);
  fflush(stdout);
    

%end
