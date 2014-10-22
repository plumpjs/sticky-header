# Sticky Header

MooTools-based sticky header that hides on scroll down and re-shows on scroll up.

Based on https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c

Relies on CSS for the show / hide animations, positioning and offsetting the main content.

````HTML
<body>
	<div id="sticky-header" class="page-head">
		Header Content
	</div>
</body>
````

````JavaScript
new StickyHeader('sticky-header', {
	collapsedClass : 'page-head--is-collapsed'
});
````

````CSS
body {
	padding-top: 40px;
}

.page-head {
	position: fixed;
	top: 0;
	height: 40px;
	width: 100%;
	z-index: 1;
	background-color: #ffffff;
	transition: top 0.2s ease-in-out;
}

.page-head--is-collapsed {
	top: -40px;
}
````