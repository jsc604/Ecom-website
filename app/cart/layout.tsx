export const metadata = {
  title: 'Cart - Ecom MN',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section>
      <h1 className="text-center font-bold my-8 text-4xl">Cart</h1>
      {children}
    </section>
  )
}