# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: :show

  def index
    @posts = Post.includes(:categories, :user)
      .where(organization_id: current_user.organization_id)
    @posts = @posts.joins(:categories).where(categories: { id: params[:category_id] }) if params[:category_id].present?
    @posts = @posts.order(created_at: :desc).distinct
  end

  def create
    @post = current_user.posts.new(post_params)
    @post.organization = current_user.organization
    @post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end

    def load_post!
      @post = Post.where(organization_id: current_user.organization_id)
        .find_by!(slug: params[:slug])
    end
end
