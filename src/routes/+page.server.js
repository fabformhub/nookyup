import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return { messages: [] };
  }

  return { messages };
}

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const content = formData.get('content');

    if (!content || content.toString().trim() === '') {
      return { success: false, error: 'Message cannot be empty' };
    }

    const { error } = await supabase
      .from('messages')
      .insert({ content: content.toString() });

    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }

    return { success: true };
  }
};
