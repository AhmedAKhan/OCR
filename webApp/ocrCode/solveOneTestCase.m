#! /bin/octave -qf

input = [];
arg_list = argv ();
for i = 1:nargin
  input = [input, arg_list{i}];
endfor

input = input .* (ones(1, 28*28)*255);

load('ThetaValues.txt')			% load the theta values

% start predicting
h1 = sigmoid([ones(size(input, 1), 1) input] * Theta1');
h2 = sigmoid([ones(size(input, 1), 1) h1] * Theta2');
[dummy, p] = max(h2, [], 2);


p = (p != 10) .* p; % this makes it so that it converts all the 10's to 0

fflush(stdout);
p
% fprintf(p);




%function solveForOne(input)
%  % start predicting
%  h1 = sigmoid([ones(size(input, 1), 1) input] * Theta1');
%  h2 = sigmoid([ones(size(input, 1), 1) h1] * Theta2');
%  [dummy, p] = max(h2, [], 2);
%endfunction



