# frozen_string_literal: true

class Posts::ReportsController < ApplicationController
  before_action :load_post!, only: :create

  def create
    authorize @post, :show?
    PostReportsJob.perform_async(@post.id, current_user.id)
  end

  def download
    unless current_user.report.attached?
      render_error(t("not_found", entity: "report"), :not_found) and return
    end

    send_data current_user.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def load_post!
      @post = policy_scope(Post).find_by!(slug: params[:post_slug])
    end

    def pdf_file_name
      current_user.report.filename.to_s
    end
end
