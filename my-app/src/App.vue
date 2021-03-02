
<template>
	<div>
		<CreateWebspace />
	</div>
</template>

<script>
import CreateWebspace from "./components/CreateWebspace.vue"

export default {
	name: "App",
	components: {
		CreateWebspace
	}
}
</script>

<style>
* {
	padding: 0;
	margin: 0;
}

body {
	padding: 10px;
	font-family: Segoe UI, sans-serif;
}

h2 {
	color: #0040d0;
	margin: 10px 20px 10px 0px;
}

h3 {
	color: #0040d0;
	margin: 20px 10px 10px 0px;
}

p {
	color: #0040d0;
}

select, input {
	background: transparent;
	color: #0040d0;
	font-weight: bold;
	border: 2px solid #0040d0;
	border-radius: 2px;
}
</style>

