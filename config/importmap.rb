# Pin npm packages by running ./bin/importmap

pin "application"
pin "game", to: "game.js"
pin "score", to: "score.js"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
