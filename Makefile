
build: components index.js d3-bar-chart.css template.js
	@component build --dev

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
