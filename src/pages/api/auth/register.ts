import type { APIRoute } from "astro";
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request, redirect, locals }) => {
	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return new Response("Email and password are required", { status: 400 });
	}

	const supabase = createClient(
		locals.runtime.env.SUPABASE_URL,
		locals.runtime.env.SUPABASE_ANON_KEY,
	);

	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return new Response(error.message, { status: 500 });
	}

	return redirect("/signin");
};