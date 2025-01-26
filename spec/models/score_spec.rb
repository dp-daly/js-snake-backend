# spec/models/score_spec.rb
require 'rails_helper'

RSpec.describe Score, type: :model do
  let(:user) { create(:user) }  # Create a user using FactoryBot

  it { should belong_to(:user) }

  it { should validate_presence_of(:value) }

  it { should validate_numericality_of(:value).is_greater_than_or_equal_to(0) }

  describe "associations and validations" do
    it "is valid with a user and a valid value" do
      score = user.scores.create(value: 10)
      expect(score).to be_valid
    end

    it "is invalid without a user" do
      score = Score.new(value: 10)
      expect(score).not_to be_valid
      expect(score.errors[:user]).to include("must exist")
    end

    it "is invalid with a value less than 0" do
      score = user.scores.build(value: -1)
      expect(score).not_to be_valid
      expect(score.errors[:value]).to include("must be greater than or equal to 0")
    end
  end
end
