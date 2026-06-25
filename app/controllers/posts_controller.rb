# frozen_string_literal: true

class PostsController < ApplicationController
  DEFAULT_ORGANIZATION_NAME = "Personal Blog".freeze
  DEFAULT_USER_EMAIL = "yaswanth@example.com".freeze
  DEFAULT_USER_NAME = "Yaswanth".freeze
  DEFAULT_USER_PASSWORD = "welcome".freeze

  before_action :load_post!, only: :show

  def index
    @posts = Post.includes(:categories, :user)
    @posts = @posts.joins(:categories).where(categories: { id: params[:category_id] }) if params[:category_id].present?
    @posts = @posts.order(created_at: :desc).distinct
  end

  def create
    default_user = find_or_create_default_user!
    @post = default_user.posts.new(post_params)
    @post.organization = default_user.organization
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
      @post = Post.find_by!(slug: params[:slug])
    end

    def find_or_create_default_user!
      organization = Organization.find_or_create_by!(name: DEFAULT_ORGANIZATION_NAME)
      User.find_or_create_by!(email: DEFAULT_USER_EMAIL) do |user|
        user.name = DEFAULT_USER_NAME
        user.password = DEFAULT_USER_PASSWORD
        user.password_confirmation = DEFAULT_USER_PASSWORD
        user.organization = organization
      end
    end
end
