# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    post.organization_id == user.organization_id &&
      (post.published? || post.user_id == user.id)
  end

  def create?
    true
  end

  def update?
    post.user_id == user.id && post.organization_id == user.organization_id
  end

  def destroy?
    update?
  end

  def vote?
    post.organization_id == user.organization_id && post.published?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(organization_id: user.organization_id)
    end
  end
end
