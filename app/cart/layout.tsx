export async function generateMetadata() {
  return {
    title: 'Cart',
  };
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section className="min-h-[60vh] w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-bold my-8 text-4xl">Cart</h1>
      {children}
    </section>
  )
}