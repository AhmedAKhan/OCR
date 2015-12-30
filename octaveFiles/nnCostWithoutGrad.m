function J = nnCostWithoutGrad( nn_params, ...
                                input_layer_size, ...
                                hidden_layer_size, ...
                                num_labels, ...
                                X, y, lambda)

Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), hidden_layer_size, (input_layer_size + 1));
Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), num_labels, (hidden_layer_size + 1));

Y = (ones(size(X,1),1) *(1:num_labels) == y * ones(1,num_labels));
H = predict(X, Theta1, Theta2);

cost = (-Y .* log(H)) - ((1-Y) .* log(1 - H));
penalty = (sum(sum(Theta1(:, 2:end) .* Theta1(:, 2:end))) + sum(sum(Theta2(:, 2:end) .* Theta2(:, 2:end)))) * (lambda /(2 * size(X, 1)));
J = sum(sum(cost))/size(X,1) + penalty ;

end



