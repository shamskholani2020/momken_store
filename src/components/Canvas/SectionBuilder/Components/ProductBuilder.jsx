export default function ProductBuilder({
  el,
  products,
  pages,
  setActivePage,
  isPreviewAppear,
}) {
  const product = products?.filter(
    (item) => item?._id === el?.options?.product
  )[0];

  return (
    <div
      onClick={() => {
        if (isPreviewAppear) {
          setActivePage((prev) => ({
            ...pages?.find((pg) => pg?.url === "/product-details"),
            props: {
              ...prev.props,
              productId: product?._id,
            },
          }));
        }
      }}
      className={`${
        isPreviewAppear && "hover:cursor-pointer"
      } w-full flex flex-col items-start justify-start gap-3 p-1 rounded-2xl bg-transparent overflow-clip group/item`}
    >
      <div className="relative w-full h-[450px] overflow-hidden">
        <div
          className={`w-full h-full flex ${
            product?.product?.images[1] &&
            "transition-transform duration-500 ease-in-out group-hover/item:translate-x-[-100%]"
          }`}
        >
          <img
            draggable={false}
            src={product?.product?.images[0]}
            className="w-full h-full object-contain flex-shrink-0"
          />
          {product?.product?.images[1] && (
            <img
              draggable={false}
              src={product?.product?.images[1]}
              className="w-full h-full object-contain flex-shrink-0"
            />
          )}
        </div>
      </div>

      {/* <p className="text-md">{product?.product?.category?.en}</p> */}

      <h1 className="text-lg w-full line-clamp-2">
        {product?.product?.name?.en}
      </h1>

      <h2 className="text-sm font-light">
        EGP {product?.variants[0]?.sellingPrice}
      </h2>

      <button
        onClick={() => {
          if (isPreviewAppear) {
            setActivePage((prev) => ({
              ...pages?.find((pg) => pg?.url === "/product-details"),
              props: {
                ...prev.props,
                productId: product?._id,
              },
            }));
          }
        }}
        className="btn btn-ghost btn-sm font-light"
      >
        View Product
      </button>
    </div>
  );
}
