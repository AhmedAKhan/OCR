function H = predict(X, Theta1, Theta2)

A1 = [ones(size(X,1), 1), X];
H = sigmoid([ones(size(X,1) , 1) , sigmoid(A1 * Theta1')] * Theta2');

end