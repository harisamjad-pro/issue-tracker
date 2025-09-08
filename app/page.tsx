import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

const ListIssues = async () => {
  const issues = await getServerIssues();

  return (
    <div>
      {issues?.map((issue, index) => (
        <div key={index}>
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
        </div>
      ))}
    </div>
  )
}

// Server Component
// Fetch data directly from Supabase and render it
// No need for an API route to fetch issues
const getServerIssues = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("issues").select().order("created_at", { ascending: false });

  if (error) console.error("Error fetching issues:", error);

  return data;
};

export default async function Home() {
  return (
    <main>
      <h1>Issue Tracker</h1>
      <Suspense fallback={<div>Loading issues...</div>}>
        <ListIssues />
      </Suspense>
    </main>
  );
}