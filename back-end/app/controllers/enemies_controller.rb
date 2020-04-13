class EnemiesController < ApplicationController

    def index 
        enemy = Enemy.all
        render json: enemy, include: [:attacks]
    end

    def show 
        enemy = Enemy.find(params[:id])
        if enemy
            render json: enemy, include: [:attacks]
        else
            render json: { error: "Not found!" }, status: 404
        end 
    end
end
