require 'uri'
require 'net/http'
require 'openssl'

class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :destroy]

  def index
    @bookings = Booking.all
  end

  def show
    @rooms = get_all_rooms
  end

  def new
    @booking = Booking.new
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.video_url = create_room(get_milliseconds)

    if @booking.save
      redirect_to booking_path(@booking)
    else
      render :new
    end
  end

  def destroy
  end

  def delete_all_rooms
    # Booking.destroy_all
    get_all_rooms['data'].each { |room| delete_a_room(room['name']) }
    redirect_to root_path
  end

  private

  def set_booking
    @booking = Booking.find(params[:id])
  end

  def booking_params
    params.require(:booking).permit(:start_time)
  end

  def get_milliseconds
    @booking.start_time.to_datetime.strftime('%Q')
  end

  def create_room(milliseconds)
    url = URI("https://api.daily.co/v1/rooms")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Content-Type"] = 'application/json'
    request["Authorization"] = "Bearer #{ENV['DAILY_API_KEY']}"
    # request.body = "{\"properties\":{\"nbf\":#{milliseconds}}}"

    response = http.request(request)
    JSON.parse(response.read_body)['url']
  end

  def get_all_rooms
    url = URI("https://api.daily.co/v1/rooms")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Authorization"] = "Bearer #{ENV['DAILY_API_KEY']}"

    response = http.request(request)
    JSON.parse(response.read_body)
  end

  def delete_a_room(room_name)
    url = URI("https://api.daily.co/v1/rooms/#{room_name}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Delete.new(url)
    request["Authorization"] = "Bearer #{ENV['DAILY_API_KEY']}"

    response = http.request(request)
    puts response.read_body
  end
end
