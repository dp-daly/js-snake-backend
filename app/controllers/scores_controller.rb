class ScoresController < ApplicationController
  before_action :authenticate_user!

  def handle_score
    score = current_user.scores.new(score_params)

    if score.save
      render json: { score: score }, status: :created
    else
      render json: { error: "Unable to save score", messages: score.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.require(:score).permit(:value)
  end
end
