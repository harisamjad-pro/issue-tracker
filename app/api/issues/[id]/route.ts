import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { error } = await supabase.from("issues").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
}
