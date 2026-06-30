# frozen_string_literal: true

class Posts::BulkUpdatesController < ApplicationController
  after_action :verify_authorized

  def update
    posts = load_posts!
    posts.each { |post| authorize post, :update? }

    Post.transaction do
      posts.each { |post| post.update!(status: bulk_params[:status]) }
    end

    render_notice(t("bulk_update.status_updated", count: posts.size))
  end

  def destroy
    posts = load_posts!
    posts.each { |post| authorize post, :destroy? }

    Post.transaction do
      posts.each(&:destroy!)
    end

    render_notice(t("bulk_update.deleted", count: posts.size))
  end

  private

    def load_posts!
      policy_scope(Post).where(slug: bulk_params[:slugs])
    end

    def bulk_params
      params.require(:bulk_update).permit(:status, slugs: [])
    end
end
