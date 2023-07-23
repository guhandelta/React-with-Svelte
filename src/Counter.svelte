<script>
    import { counter } from './store'
</script>

<button 
    type="button"
    class="btn btn-success btn-md m-2"
    on:click={$counter.increment}
>
    Svelete: Count is {$counter.count}
</button>