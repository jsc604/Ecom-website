interface MetadataProps {
  params: {
    id: string;
  }
}

export async function generateMetadata({ params }: MetadataProps) {
  return {
    title: `Order #${params.id} - Ecom MN`,
  };
}

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section>
      {children}
    </section>
  )
}