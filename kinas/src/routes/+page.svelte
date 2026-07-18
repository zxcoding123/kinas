<script>
	import { onMount } from 'svelte';

	const text = 'KINAS';
	let showCursor = $state(false);
	
	// Real mouse coordinates
	let mouse = { x: -100, y: -100 };
	// Rendered cursor coordinates that lag behind
	let cursor = $state({ x: -100, y: -100 });

	onMount(() => {
		const timer = setTimeout(() => {
			showCursor = true;
		}, 1550);

		const handleMouseMove = (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		// Linear interpolation loop for the smooth lag effect
		let frameId;
		const updateCursor = () => {
			// Change 0.15 to adjust the lag. Lower = more lag/smoother, Higher = snappier
			const speed = 0.15; 
			
			cursor.x += (mouse.x - cursor.x) * speed;
			cursor.y += (mouse.y - cursor.y) * speed;

			frameId = requestAnimationFrame(updateCursor);
		};

		window.addEventListener('mousemove', handleMouseMove);
		frameId = requestAnimationFrame(updateCursor);

		return () => {
			clearTimeout(timer);
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(frameId);
		};
	});
</script>

<div 
	class="flex h-screen w-screen items-center justify-center bg-black overflow-hidden select-none"
>
	<div class="flex">
		{#each text.split('') as letter, i (i)}
			<span
				class="text-white text-9xl font-bold inline-block animate-letter opacity-0"
				style="animation-delay: {i * 150}ms;"
			>
				{letter}
			</span>
		{/each}
	</div>

	{#if showCursor}
		<div 
			class="custom-cursor animate-cursor-pop"
			style="translate: {cursor.x}px {cursor.y}px;"
		></div>
	{/if}
</div>