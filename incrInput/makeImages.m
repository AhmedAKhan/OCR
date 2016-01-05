

% returns a list of values where each row represents a picture,
% it will be a row of size 784 columns representing a picture 28 by 28
images = csvread('trainDataIncreased.csv');
numberOfImages = min(24, size(images)(1));
results = images(:, 1);
results = results(2:numberOfImages);

images(:, 1) = []; % removed the results

images = images>100;% binary threshold is 100
images = images*255;% makes it so that when it prints it, it will still be white

for i = 2:numberOfImages
  image = images(i, :);  				% get the image row
  image = reshape(image, 28, 28); 			% reshape it accordingly
  image = image/255;
  imwrite(image, ['processedImages/image', num2str(i), '.png'], 'png') 	% save it accordingly
end

% save -ascii 'inputImages/results.txt' results

save -ascii 'processedImages/results.txt' results

