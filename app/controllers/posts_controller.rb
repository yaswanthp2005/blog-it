# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = policy_scope(Post).includes(:categories, :user)

    if params[:mine] == "true"
      @posts = @posts.where(user_id: current_user.id)
      @posts = PostFilterService.new(@posts, params:).process
    else
      @posts = @posts.published

      category_ids = Array(params[:category_ids]).compact_blank

      if category_ids.present?
        matching_post_ids = PostCategory.where(category_id: category_ids).select(:post_id)
        @posts = @posts.where(id: matching_post_ids)
      end
    end

    @posts = @posts.order(created_at: :desc)
  end

  def create
    @post = current_user.posts.new(post_params)
    @post.organization = current_user.organization
    authorize @post
    @post.save!
    render_notice(
      t("successfully_created", entity: "Post"),
      :ok,
      post: { slug: @post.slug }
    )
  end

  def show
    authorize @post
  end

  def update
    authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post")) unless params.key?(:quiet)
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end

    def load_post!
      @post = policy_scope(Post).find_by!(slug: params[:slug])
    end
end
