<script>
    export let extraText = "Props";
    export let onClick = {};
</script>

<div class="text-3xl font-bold text-center" on:click={onClick}>
    Hello from Svelte Component {extraText} <br/> <br/>
</div>