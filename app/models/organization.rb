# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :posts, dependent: :restrict_with_exception
  has_many :users, dependent: :restrict_with_exception

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
