# frozen_string_literal: true

class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  protect_from_forgery

  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid

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
end
