function [J grad] = nnCostFunction(nn_params, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   num_labels, ...
                                   X, y, lambda)

Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                 hidden_layer_size, (input_layer_size + 1));

Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                 num_labels, (hidden_layer_size + 1));

% Setup some useful variables
m = size(X, 1);
         
% You need to return the following variables correctly 
J = 0;
Theta1_grad = zeros(size(Theta1));
Theta2_grad = zeros(size(Theta2));

%A1 = [ones(size(X,1), 1), X];
Y = (ones(size(X,1),1) *(1:num_labels) == y * ones(1,num_labels));
%H = sigmoid([ones(size(X,1) , 1) , sigmoid(A1 * Theta1')] * Theta2');

A1 = [ones(m, 1) X];
Z2 = A1 * Theta1';
A2 = [ones(size(Z2, 1), 1) sigmoid(Z2)];
Z3 = A2*Theta2';
H = A3 = sigmoid(Z3);

cost = (-Y .* log(H)) - ((1-Y) .* log(1 - H));

penalty = (sum(sum(Theta1(:, 2:end) .* Theta1(:, 2:end))) + sum(sum(Theta2(:, 2:end) .* Theta2(:, 2:end)))) * (lambda /(2 * m));

J = sum(sum(cost))/size(X,1) + penalty ;

%FP
A1 = [ones(m, 1) X];
Z2 = A1 * Theta1';
A2 = [ones(size(Z2, 1), 1) sigmoid(Z2)];
Z3 = A2*Theta2';
H = A3 = sigmoid(Z3);

delta_3 = (A3 - Y);	%step 2;
delta_2 = (delta_3 * Theta2 .* sigmoidGradient([ones(size(Z2, 1), 1), Z2]))(:, 2:end); %step 3

% step 4 + 5

Delta2 = (delta_3' * A2);
Delta1 = (delta_2' * A1);

Theta2_grad = Delta2/m + (lambda/m)*[zeros(size(Theta2,1),1), Theta2(:, 2:end)];
Theta1_grad = Delta1/m + (lambda/m)*[zeros(size(Theta1,1),1), Theta1(:, 2:end)];
						
grad = [Theta1_grad(:) ; Theta2_grad(:)];

end
