require 'faye/websocket'

module RealVote
  class RealVoteBackend
    KEEPALIVE_TIME = 15 # in seconds

    def initialize(app)
      @app     = app
      @clients = []
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
          p [:message, event.data]
          @clients.each {|client| client.send(event.data) }
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
