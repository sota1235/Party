require 'sinatra/base'
require 'sinatra/assetpack'
require 'sinatra/reloader'
require 'sinatra/content_for'
require 'slim'
require 'sass'
require 'coffee-script'

class AllStarThanksGiving < Sinatra::Base
  configure do
    set :public_folder, File.dirname(__FILE__) + '/public'
    register Sinatra::AssetPack
    helpers Sinatra::ContentFor
  end

  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    slim :index
  end

  # send message to websocket clients
  post '/vote' do
    # send message to clients by websocket
  end

  # js and css
  assets do
    serve '/js', :from => 'assets/js'
    js :application, [
      'js/*.js'
    ]

    serve '/css', :from => 'assets/css'
    css :application, [
      '/css/*.css'
    ]

    js_compression :jsmin
    css_compression :sass
  end
end
