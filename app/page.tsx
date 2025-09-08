import { createClient } from '@/utils/supabase/server';
// import { supabaseAdmin } from '@/utils/supabase/server';
import { Suspense } from 'react';

type Issues = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

const ListIssues = async () => {
  const issues: Issues[] = await getServerIssues();

  return (
    <div>
      {issues.length > 0 ? issues.map((issue, index) => (
        <div key={index}>
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
        </div>
      )) : <p>No issues found</p>}
    </div>
  )
}

// Server Component
// Fetch data directly from Supabase and render it
// No need for an API route to fetch issues
const getServerIssues = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("issues").select().order("created_at", { ascending: false });
  // const { data, error } = await supabaseAdmin.from("issues").select().order("created_at", { ascending: false });

  if (error) console.error("Error fetching issues:", error);

  return data ?? [];
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