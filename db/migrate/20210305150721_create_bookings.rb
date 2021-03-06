class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.string :video_url
      t.datetime :start_time

      t.timestamps
    end
  end
end
