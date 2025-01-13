class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [ :register, :login ]

  def register
    user = User.new(user_params)

    if user.save
      token = generate_jwt_token(user.id)  # Generate JWT token
      render json: { user: user, token: token }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])  # Check if user exists and password is correct
      token = generate_jwt_token(user.id)  # Generate JWT token
      render json: { user: user, token: token }, status: :ok
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

    # Sign out user (invalidate session on client side)
    def logout
      # This is essentially a no-op on the server side. The client needs to delete its token.
      render json: { message: "Successfully logged out" }, status: :ok
    end

    # List all users (for admin or authenticated user)
    def list_users
      # I will restrict this to admins or users with proper permissions later
      users = User.all
      render json: { users: users }, status: :ok
    end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
