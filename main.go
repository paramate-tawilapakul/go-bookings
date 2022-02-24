package main

import (
	"bookings/pkg/config"
	"bookings/pkg/handlers"
	"bookings/pkg/render"
	"fmt"
	"log"
	"net/http"
)

var address string = "localhost:4000"

func main() {
	var app config.AppConfig

	tc, err := render.CreateTemplateCache()
	if err != nil {
		log.Fatal("cannot create template cache")
	}

	app.TemplateCache = tc
	app.UseCache = false
	render.NewTemplate(&app)

	repo := handlers.NewRepo(&app)
	handlers.NewHandlers(repo)

	srv := &http.Server{
		Addr:    address,
		Handler: routes(&app),
	}

	fmt.Println("Server running at", address)
	err = srv.ListenAndServe()

	log.Fatal(err)
}
