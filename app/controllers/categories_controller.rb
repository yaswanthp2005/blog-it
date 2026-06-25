# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.order(:name)
  end

  def create
    category = Category.create!(category_params)
    render_notice(
      t("successfully_created", entity: "Category"),
      :ok,
      category: {
        id: category.id,
        name: category.name
      }
    )
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
