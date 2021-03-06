Rails.application.routes.draw do
  root to: 'bookings#index'
  get 'pages/home'
  get 'pages/room'

  resources :bookings, except: [:edit, :update]
  get 'bookings/:bookings_id/del_room', to: 'bookings#delete_all_rooms', as: :delete_rooms
end
