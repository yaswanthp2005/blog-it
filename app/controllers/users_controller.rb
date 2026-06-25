# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    organization = Organization.find_or_create_by!(name: "Personal Blog")
    user = organization.users.create!(user_params)
    render_notice(
      "Successfully created User",
      :ok,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    )
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
