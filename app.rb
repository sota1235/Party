require 'sinatra'
require 'slim'


get '/' do
  slim :index
end
