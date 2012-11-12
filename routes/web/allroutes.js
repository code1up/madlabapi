var _controller = {
	routes: [
		{
			title: "Home",
			path: "/",
			icon: "icon-home"
		},
		{
			title: "Featured",
			path: "/featured",
			icon: "icon-star"
		},
		{
			title: "Events",
			path: "/events",
			icon: "icon-calendar"
		},
		{
			title: "Blog",
			path: "/blog",
			icon: "icon-comment"
		}
	]
}

function _use(app) {
	var assert = require("assert");

	assert.ok(app, "app");

	require("./root").use(app, _controller);
	require("./events").use(app, _controller);
	require("./blog").use(app, _controller);
}

exports.use = _use;
