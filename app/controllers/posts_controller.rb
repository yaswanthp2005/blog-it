# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]
  before_action :authorize_post_owner!, only: %i[update destroy]

  def index
    @posts = Post.includes(:categories, :user)
      .where(organization_id: current_user.organization_id)

    @posts = if params[:mine] == "true"
      @posts.where(user_id: current_user.id)
    else
      @posts.published
    end

    if params[:category_id].present?
      @posts = @posts.joins(:categories).where(categories: { id: params[:category_id] })
    end

    @posts = @posts.order(created_at: :desc).distinct
  end

  def create
    @post = current_user.posts.new(post_params)
    @post.organization = current_user.organization
    @post.save!
    render_notice(
      t("successfully_created", entity: "Post"),
      :ok,
      post: { slug: @post.slug }
    )
  end

  def show
    unless @post.published? || @post.user_id == current_user.id
      render_error("Couldn't find Post", :not_found) and return
    end
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post")) unless params.key?(:quiet)
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end

    def load_post!
      @post = Post.where(organization_id: current_user.organization_id)
        .find_by!(slug: params[:slug])
    end

    def authorize_post_owner!
      return if @post.user_id == current_user.id

      render_error("Unauthorized", :forbidden)
    end
end
