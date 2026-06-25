# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: :show

  def index
    @posts = Post.order(created_at: :desc)
  end

  def create
    @post = Post.new(post_params)
    @post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
