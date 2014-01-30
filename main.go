package main

import (
	"github.com/codegangsta/martini"
	"github.com/codegangsta/martini-contrib/render"
	"github.com/russross/blackfriday"
	"net/http"
)

func main() {
	m := martini.Classic()

	m.Use(martini.Static("assets"))
	m.Use(render.Renderer(render.Options{
		Directory:  "templates",                // Specify what path to load the templates from.
		Layout:     "layout",                   // Specify a layout template. Layouts can call {{ yield }} to render the current template.
		Extensions: []string{".tmpl", ".html"}, // Specify extensions to load for templates.
		Charset:    "UTF-8",                    // Sets encoding for json and html content-types. Default is "UTF-8".
	}))

	m.Get("/", func(r render.Render) {
		r.HTML(200, "index", nil)
	})

	m.Post("/update", func(r render.Render, req *http.Request) {
		html := req.FormValue("html")
		md := blackfriday.MarkdownBasic([]byte(html))
		r.JSON(200, map[string]interface{}{"md": string(md)})
	})

	m.Run()
}
