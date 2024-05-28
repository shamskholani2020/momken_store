import SectionBuilder from "../SectionBuilder";

export default function DivBuilder({ el, activeBreakpoint }) {
  const position = el?.position[activeBreakpoint];

  const layout = el?.layout[activeBreakpoint];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: `${layout?.margin?.top} ${layout?.margin?.right} ${layout?.margin?.bottom} ${layout?.margin?.left}`,
        padding: `${layout?.padding?.top} ${layout?.padding?.right} ${layout?.padding?.bottom} ${layout?.padding?.left}`,

        position: position?.type,
        top: position?.specs?.top,
        left: position?.specs?.left,
        right: position?.specs?.right,
        bottom: position?.specs?.bottom,
        zIndex: position?.zIndex,

        borderRadius: position?.borderRaduis?.total.includes("0")
          ? position?.borderRaduis?.total
          : `${position?.borderRaduis?.topLeft} ${position?.borderRaduis?.topRight} ${position?.borderRaduis?.bottomRight} ${position?.borderRaduis?.bottomLeft}`,

        display: "flex",
        flexDirection: layout?.reversed
          ? `${layout?.direction}-reverse`
          : layout?.direction,
        justifyContent: layout?.justifyContent,
        alignItems: layout?.alignItems,
        // gap on gap.x and gap.y axis
        gap: layout?.gap?.total,
      }}
      className={`${layout?.justifyContent} ${layout?.alignItems} bg-no-repeat bg-center`}
    >
      {el?.children &&
        el?.children?.length > 0 &&
        el?.children?.map((child, index) => {
          return (
            <>
              <SectionBuilder
                key={child?._id}
                el={child}
                activeBreakpoint={activeBreakpoint}
              />
            </>
          );
        })}
    </div>
  );
}
