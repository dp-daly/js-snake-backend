class ApplicationController < ActionController::Base
  # Disable CSRF protection for API routes
  protect_from_forgery with: :null_session

  # Authenticate user from the provided JWT token
  def authenticate_user_from_token
    auth_header = request.headers["Authorization"]

    if auth_header.present? && auth_header.start_with?("Bearer ")
      token = auth_header.split(" ").last
      begin
        decoded_payload = decode_jwt_token(token)
        Rails.logger.debug("Decoded Token: #{decoded_payload}") # Log the decoded payload
        @current_user = User.find(decoded_payload["user_id"])
      rescue JWT::DecodeError => e
        Rails.logger.error("JWT Decode Error: #{e.message}") # Log the decoding error
        render json: { error: "Invalid token" }, status: :unauthorized
      rescue ActiveRecord::RecordNotFound => e
        Rails.logger.error("User Not Found: #{e.message}")  # Log missing user
        render json: { error: "User not found" }, status: :unauthorized
      end
    else
      render json: { error: "Missing token" }, status: :unauthorized
    end
  end

  private

  def decode_jwt_token(token)
    JWT.decode(token, Rails.application.credentials.secret_key_base).first
  rescue JWT::DecodeError
    nil
  end

  # Generate a JWT token for the given user_id
  def generate_jwt_token(user_id)
    JWT.encode({ user_id: user_id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.secret_key_base)
  end
end
