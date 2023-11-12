<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { User } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient';
	import type { Writable } from 'svelte/store';
	import { localStorageStore } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const bacToggle: Writable<boolean> = localStorageStore('bacEnabled', false);

	async function deletePost(postId: number) {
		if (!confirm('Are you sure you want to delete this post?')) return;

		const { error } = await supabase.from('posts').delete().match({ id: postId });

		if (error) {
			alert('Error deleting post: ' + error.message);
		} else {
			// Assuming you have a local posts array that you want to update
			data.posts = data.posts.filter((post) => post.id !== postId);
		}
	}
</script>

<div class="container h-full flex m-10">
	<div class="space-y-10 text-center flex flex-col items-start">
		<div class="flex flex-row gap-4">
			<h2 class="h2">BAC</h2>
			<a href="/" class="inline-block h2 text-gray-500">XSS</a>
		</div>

		<div class="flex flex-row gap-5">
			<h3 class="text-xl">BAC enabled:</h3>
			<SlideToggle name="xssSlide" bind:checked={$bacToggle} />
		</div>

		<h1 class="text-2xl">Delete posts</h1>

		{#if $bacToggle}
			{#if data.posts.length === 0}
				<p>No posts currently.</p>
			{:else}
				{#each data.posts as post}
					<div class="group relative card p-4 text-left w-full mx-auto max-w-md">
						{#if true}
							<!-- Assuming isAdmin is a reactive variable that checks if the user is an admin -->
							<div class="absolute top-2 right-2 invisible group-hover:visible">
								<button class="text-white bg-red-500 p-2" on:click={() => deletePost(post.id)}>
									&times; <!-- This is the X button -->
								</button>
							</div>
						{/if}
						<div class="card-content">
							<div class="card-title text-3xl">{post.title}</div>
							<div class="card-body mt-3">{post.body}</div>
						</div>
					</div>
				{/each}
			{/if}
		{:else}
			<h1 class="text-3xl text-red-500">You are not allowed to delete posts</h1>
		{/if}
	</div>
</div>
