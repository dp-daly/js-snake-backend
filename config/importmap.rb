# Pin npm packages by running ./bin/importmap

pin "application"
pin "gamePlay", to: "gamePlay.js"
pin "startGame", to: "startGame.js"
pin "endGame", to: "endGame.js"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
