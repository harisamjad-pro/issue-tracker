// app/details/[slug]/page.tsx

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <h1>Detail Page</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}
