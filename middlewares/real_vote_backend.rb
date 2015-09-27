require 'faye/websocket'
require 'json'

module RealVote
  class RealVoteBackend
    KEEPALIVE_TIME = 15 # in seconds

    def initialize(app)
      @app     = app
      @clients = []
      @masters = [] # list of ws id its quiz master
      @score   = [ 0, 0, 0, 0 ] # score of quiz
    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        ws = Faye::WebSocket.new(env, nil, ping: KEEPALIVE_TIME)

        # 接続開始
        ws.on :open do |event|
          p [:open, ws.object_id]
          @clients << ws
        end

        # 通信受信
        ws.on :message do |event|
          # get type of message
          json = JSON.parse(event.data)
          type = json['type']
          puts json
          @masters.each {|master| master.send(JSON.pretty_generate json) }

          if type == 'master'
            @masters << ws
          end
        end

        # 通信終了
        ws.on :close do |event|
          p [:close, ws.object_id, event.code, event.reason]
          @clients.delete(ws)
          ws = nil
        end
        ws.rack_response
      else
        @app.call(env)
      end
    end
  end
end
