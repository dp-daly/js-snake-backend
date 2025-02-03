class GamesController < ApplicationController
  before_action :authenticate_user!

  def create
    @game = Game.new(user_id: current_user.id)

    if @game.save
      render json: @game, status: :created
    else
      render json: { error: "Failed to create game" }, status: :unprocessable_entity
    end
  end

  def game_over
    game_id = params[:score][:game_id]
    score_value = params[:score][:value]

    @game = Game.find_by(id: game_id)

    unless @game
      return render json: { error: "Game not found" }, status: :not_found
    end

    @score = Score.new(user_id: current_user.id, game_id: @game.id, value: score_value)

    if @score.save
      @game.update(status: "complete")
      render json: @score, status: :created
    else
      render json: { error: "Failed to save score" }, status: :unprocessable_entity
    end
  end
end
