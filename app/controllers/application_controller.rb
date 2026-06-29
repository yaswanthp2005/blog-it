# frozen_string_literal: true

class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  before_action :authenticate_user_using_x_auth_token

  protect_from_forgery

  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid
  rescue_from Pundit::NotAuthorizedError, with: :handle_authorization_error

  include Pundit::Authorization

  def render_notice(message, status = :ok, context = {})
    render status:, json: { notice: message }.merge(context)
  end

  def render_error(error, status = :unprocessable_entity, context = {})
    render status:, json: { error: error }.merge(context)
  end

  private

    def handle_record_not_found(exception)
      render_error("Couldn't find #{exception.model}", :not_found)
    end

    def handle_record_invalid(exception)
      error_message = exception.record.errors.full_messages.join(", ")
      render_error(error_message, :unprocessable_entity)
    end

    def authenticate_user_using_x_auth_token
      user_email = request.headers["X-Auth-Email"].presence
      auth_token = request.headers["X-Auth-Token"].presence
      user = user_email && User.find_by(email: user_email)
      is_valid_token = user && auth_token && ActiveSupport::SecurityUtils.secure_compare(
        user.authentication_token,
        auth_token
      )

      if is_valid_token
        @current_user = user
      else
        render_error("Could not authenticate with the provided credentials", :unauthorized)
      end
    end

    def current_user
      @current_user
    end

    def handle_authorization_error
      render_error(t("authorization.denied"), :forbidden)
    end
end
