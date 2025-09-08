import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  // const supabase = await createClient();
  // const { data: issues } = await supabase.from("issues").select();
  const issues = await getIssues();

  return (
    <>
      {issues?.map((issue, index) => (
        <div key={index}>
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
        </div>
      ))}
    </>
  )
}

// Server Component
// Fetch data directly from Supabase and render it
// No need for an API route to fetch issues
const getIssues = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("issues")
    .select()
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching issues:", error);

  return data;
};