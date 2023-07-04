<script lang="ts">
	import { superForm } from "sveltekit-superforms/client"
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
	import { z } from "zod"
	import type { PageData } from "./$types"

	export let data: PageData

	const newContactSchema = z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		email: z.string().email()
	})

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage: "Are you sure you want leave?",
		validators: newContactSchema
	})
</script>

<!-- <SuperDebug data={$form} /> -->
<form class="p-6 space-y-6" method="POST" use:enhance>
    <label class="block text-sm font-medium" for="firstName">First name</label>
    <input class="input px-4 py-2 rounded" type="text" id="firstName" name="firstName" bind:value={$form.firstName} />
    {#if $errors.firstName}
        <small>{$errors.firstName}</small>
    {/if}
    <label class="block text-sm font-medium" for="lastName">Last name</label>
    <input class="input px-4 py-2 rounded" type="text" id="lastName" name="lastName" bind:value={$form.lastName} />
    {#if $errors.lastName}
    	<small>{$errors.lastName}</small>
    {/if}
    <label class="block text-sm font-medium " for="email">Email address</label>
    <input class="input px-4 py-2 rounded" type="email" id="email" name="email" bind:value={$form.email} />
    {#if $errors.email}
        <small>{$errors.email}</small>
    {/if}
    <button class="block btn btn-primary px-4 py-2" type="submit">Submit</button>
</form>