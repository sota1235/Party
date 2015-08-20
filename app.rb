require 'sinatra/base'
require 'sinatra/assetpack'
require 'sinatra/reloader'
require 'slim'
require 'sass'
require 'coffee-script'

class AllStarThanksGiving < Sinatra::Base
  configure do
    set :public_folder, File.dirname(__FILE__) + '/public'
    register Sinatra::Reloader
    register Sinatra::AssetPack
  end

  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    slim :index
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
