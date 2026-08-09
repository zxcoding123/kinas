<script>
    import Intro from '$lib/components/Intro.svelte';
	import Manifesto from '$lib/components/Manifesto.svelte';
    import Ecosystem from '$lib/components/Ecosystem.svelte';
	import Systems from '$lib/components/Systems.svelte';
	import Beliefs from '$lib/components/Beliefs.svelte';
	import Ledger from '$lib/components/Ledger.svelte';
	import ContactTerminal from '$lib/components/ContactTerminal.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>QUINAS — Systems Engineered With Intent</title>
	<meta
		name="description"
		content="Product engineering studio building high-fidelity digital infrastructure — stripped of noise, calculated by design."
	/>
</svelte:head>

<Intro />
<Manifesto />
<Ecosystem />
<Systems />
<Beliefs />
<Ledger />
<ContactTerminal />
<Footer />