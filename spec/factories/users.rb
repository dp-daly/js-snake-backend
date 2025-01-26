FactoryBot.define do
  factory :user do
    username { "testuser" } 
    email { "user@example.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
