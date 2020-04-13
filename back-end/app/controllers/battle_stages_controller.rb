class BattleStagesController < ApplicationController
    def index 
        battles_stages = BattleStage.all
        render json: battles_stages
    end
end
