class LinksController < ApplicationController
  before_action :generate_slug, :shortened_url, :validate_url, :check_uniqueness_of_link, only: :create
  before_action :load_link, only: [:show, :update]
  
  def index
    links = Link.all.order(is_pinned: :desc, created_at: :desc)
    render status: :ok, json: { links: links }
  end

  def create
    @link = Link.new(link_params)
    if @link.save
      render status: :ok, json: { notice: t('successfully_created') }
    else
      errors = @link.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors  }
    end
  end

  def show
    @link.update_attribute(:clicked, @link.clicked + 1)
    redirect_to @link.original_url
  end

  def update
    @link.update_attribute(:is_pinned, !@link.is_pinned)
    render status: :ok, json: { message: t('successfully_updated') }

  end
  
  private

  def link_params
    params.require(:link).permit(:original_url)
      .merge(slug: @slug, shortened_url: @shortened_url)
  end

  def load_link
    @link = Link.find_by_slug(params[:slug])
    render json: {errors: t('link_not_found_error')} unless @link
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def generate_slug
    @slug = SecureRandom.hex(4)
    link = Link.find_by(slug: @slug)
    generate_slug() if link
  end

  def shortened_url
    @shortened_url = "#{request.base_url}/#{@slug}"
  end

  def validate_url
    unless (link_params[:original_url] =~ /^(http|https)/)
      render status: :unprocessable_entity, json: {
        errors: t('link_format_error')
      }
    end
  end

  def check_uniqueness_of_link
    link = Link.find_by(original_url: link_params[:original_url])
    if link
      render status: :unprocessable_entity, json: {
        info: t('link_already_exist')
      }
    end
  end
end
