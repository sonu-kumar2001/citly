class Link < ApplicationRecord
  validates :original_url, presence: true, uniqueness: true, format: URI::regexp(%w[http https]), length: { minimum: 10 }
  validates :shortened_url, presence: true, uniqueness: true, format: URI::regexp(%w[http https])
  validates :slug, presence: true, uniqueness: true
end