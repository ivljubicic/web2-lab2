<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	export let data;

	let title = '';
	let body = '';

	let xssEnabled: boolean = false;
	let bacToggle: boolean = false;

	$: isFormValid = title.trim() !== '' && body.trim() !== '';

	let showForm = false;

	function toggleForm() {
		showForm = !showForm;
	}

	async function handleSubmit() {
		if (!isFormValid) return;
		const post = { title, body, created_at: new Date().toISOString() };
		const { data, error } = await supabase
			.from('posts') // Replace 'posts' with your actual table name
			.insert([post]);

		if (error) {
			console.error('Error submitting post:', error);
			return;
		}
		console.log('Post submitted:', data);

		// Reset form
		title = '';
		body = '';
		showForm = false;
	}
</script>

<div class="container h-full flex m-10">
	<div class="space-y-10 text-center flex flex-col items-start">
		<h2 class="h2">XSS</h2>

		<div class="flex flex-row gap-5">
			<h3 class="text-xl">XSS enabled:</h3>
			<SlideToggle name="xssSlide" bind:checked={xssEnabled} />
		</div>

		<button type="button" class="btn variant-filled" on:click={toggleForm}>Add Post</button>

		{#if showForm}
			<div class="card p-5 text-left">
				<form on:submit|preventDefault={handleSubmit} class="form-group">
					<label class="label">
						<span>Title</span>
						<input
							class="input {title.trim() === '' ? 'input-invalid' : ''}"
							type="text"
							placeholder="Input"
							bind:value={title}
						/>
					</label>

					<label class="label">
						<span>Body</span>
						<textarea
							class="textarea {body.trim() === '' ? 'input-invalid' : ''}"
							rows="4"
							placeholder="Lorem ipsum..."
							bind:value={body}
						/>
					</label>

					{#if !isFormValid}
						<p class="text-red-500">Both title and body fields must be filled.</p>
					{/if}

					<button type="submit" class="btn variant-filled" disabled={!isFormValid}
						>Submit Post</button
					>
				</form>
			</div>
		{/if}

		{#each data.posts as post}
			<div class="card p-4 text-left w-full mx-auto max-w-md">
				<div class="card-content">
					<div class="card-title text-3xl">{post.title}</div>
					{#if xssEnabled}
						<div class="card-body mt-3">{@html post.body}</div>
					{:else}
						<div class="card-body mt-3">{post.body}</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.input-invalid {
		border: 2px solid red;
	}
</style>
