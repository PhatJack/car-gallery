interface CarDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  return (
    <div>
      <h1>Car Detail Page</h1>
      <p>Car ID: {id}</p>
    </div>
  );
}
