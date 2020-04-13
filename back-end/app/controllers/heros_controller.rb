class HerosController < ApplicationController

    def index 
        hero = Hero.all
        render json: hero, include: [:attacks]
    end

    def show 
        hero = Hero.find(params[:id])
        if hero
            render json: hero, include: [:attacks]
        else
            render json: { error: "Not found!" }, status: 404
        end 
    end
end
