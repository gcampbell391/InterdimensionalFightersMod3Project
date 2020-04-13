class GamesController < ApplicationController

    def index 
        games = Game.all
        render json: games
    end

    def show 
        game = Game.find(params[:id])
        if game
            render json:game
        else
            render json: { error: "Not found!" }, status: 404
        end
    end

    def create
        game = Game.create(player_name: params["name"], score: params["score"])
        render json: game
    end


end