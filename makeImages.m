
numberOfImages = 24;

% returns a list of values where each row represents a picture,
% it will be a row of size 784 columns representing a picture 28 by 28
images = csvread('train.csv');
results = images(:, 1);
results = results(2:numberOfImages);
images(:, 1) = [];

for i = 2:numberOfImages
  image = images(i, :);  				% get the image row
  image = reshape(image, 28, 28); 			% reshape it accordingly
  image = image/255;
  imwrite(image, ['outputImages/image', num2str(i), '.png'], 'png') 	% save it accordingly
end

save -ascii 'outputImages/results.txt' results

